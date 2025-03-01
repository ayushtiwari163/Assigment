const { csvProcessingQueue } = require("../utils/bull");
const { processImages } = require("./proccess-images");



if (!csvProcessingQueue || typeof csvProcessingQueue.process !== "function") {
    console.error("❌ Error: Queue is not initialized correctly.");
    process.exit(1);
}
csvProcessingQueue.process("processCSV", async (job) => {
    console.log(`🔄 Processing job for Request ID: ${job.data.requestId}`);
    await processImages(job);
});

console.log("🚀 Queue Consumer is running and ready to process jobs...");
