class DeltaTracker {
    private lastTime: number

    public getAndUpdateDelta(): number{
        if(!this.lastTime){
            this.lastTime = this.getTimestampMS()
            return 0
        }

        const currentTime = this.getTimestampMS()
        // delta => time since last frame in seconds
        const delta = (currentTime - this.lastTime) /1000
        this.lastTime = currentTime
        return delta;
    }

    private getTimestampMS(): number {
        return (new Date()).getTime()
    }
}

export default DeltaTracker;