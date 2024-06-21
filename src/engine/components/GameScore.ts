class GameScore{
    private score: number = 0
    private highestScore: number = this.loadHighestScore()

    public update(){
        this.score++;
        this.saveHighestScore();
    }

    public getScore(){
        return this.score
    }

    public getHighestScore(){
        return this.highestScore
    }

    public resetScore(){
        this.score = 0;
    }

    private loadHighestScore(){
        const savedHighestScore = localStorage.getItem('highestScore');
        return savedHighestScore ? parseInt(savedHighestScore) : 0;
    }

    private saveHighestScore(){
        if(this.score > this.highestScore){
            this.highestScore = this.score;
            localStorage.setItem('highestScore', this.highestScore.toString()); 
        }
    }
}

export default GameScore