const {mailsender} = require("./SendMail");

class EmailQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
        this.retryAttempts = 3;
        this.retryDelay = 5000; // 5 seconds
    }

    async addToQueue(email, title, body) {
        const emailJob = {
            id: Date.now() + Math.random(),
            email,
            title,
            body,
            attempts: 0,
            maxAttempts: this.retryAttempts,
            createdAt: new Date()
        };
        
        this.queue.push(emailJob);
        
        if (!this.processing) {
            this.processQueue();
        }
        
        return emailJob.id;
    }

    async processQueue() {
        this.processing = true;
        
        while (this.queue.length > 0) {
            const job = this.queue.shift();
            
            try {
                console.log(`Attempting to send email to ${job.email} (attempt ${job.attempts + 1}/${job.maxAttempts})`);
                
                const result = await mailsender(job.email, job.title, job.body);
                console.log(`Email sent successfully to ${job.email}:`, result.messageId);
                
            } catch (error) {
                job.attempts++;
                console.log(`Email failed for ${job.email}. Attempt ${job.attempts}/${job.maxAttempts}. Error: ${error.message}`);
                
                if (job.attempts < job.maxAttempts) {
                    console.log(`Retrying email to ${job.email} in ${this.retryDelay}ms`);
                    
                    setTimeout(() => {
                        this.queue.unshift(job); // Add back to front of queue
                    }, this.retryDelay);
                    
                    // Wait for retry delay before processing next item
                    await new Promise(resolve => setTimeout(resolve, this.retryDelay));
                } else {
                    console.log(`Email failed permanently for ${job.email} after ${job.maxAttempts} attempts`);
                    // You could save failed emails to a database for manual retry later
                }
            }
        }
        
        this.processing = false;
    }

    // Method to send email immediately (for critical emails)
    async sendImmediate(email, title, body) {
        try {
            return await mailsender(email, title, body);
        } catch (error) {
            console.log(`Immediate email failed for ${email}, adding to queue for retry`);
            this.addToQueue(email, title, body);
            throw error;
        }
    }
}

// Create a singleton instance
const emailQueue = new EmailQueue();

module.exports = {
    emailQueue,
    sendEmailWithRetry: (email, title, body) => emailQueue.addToQueue(email, title, body),
    sendEmailImmediate: (email, title, body) => emailQueue.sendImmediate(email, title, body)
};