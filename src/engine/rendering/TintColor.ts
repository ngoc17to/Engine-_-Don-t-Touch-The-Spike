class TintColor{
    private srcImage: string;
    private tintColorArray: number[] | undefined

    constructor(srcImage:string, tintColor:string){
        this.srcImage = srcImage;
        this.tintColorArray = this.getRGBAArray(tintColor);
    }

    public setSourceImage(srcImage:string): TintColor{
        this.srcImage = srcImage;
        return this;
    }

    public setTintColorArray(tintColor: string): TintColor{
        this.tintColorArray = this.getRGBAArray(tintColor);
        return this
    }

    public run(canvasEl: HTMLCanvasElement): Promise<{ url: string }>{
        return new Promise<{ url: string }> ((resolve, reject) =>{
            const context = canvasEl.getContext("2d");
            const screenWidth = canvasEl.width;
            const screenHeight = canvasEl.height;
            if(context){
                let image = new Image();
                image.crossOrigin = "Anonymous";

                context.drawImage(image, 0, 0, screenWidth, screenHeight)

                let imgData = context.getImageData(0, 0, screenWidth, screenHeight)
                let data = imgData.data

                if(this.tintColorArray){
                    for(let i = 0; i<data.length; i+=4) {
                        // Change color of pixel which is different from transparent
                        if((data[i + 0] || data[i + 1] || data[i + 2]) || data[i + 3]){
                            data[i + 0] = this.tintColorArray[0]
                            data[i + 1] = this.tintColorArray[1]
                            data[i + 2] = this.tintColorArray[2]
                            data[i + 3] = this.tintColorArray[3]
                        }
                    }
                }

                context.putImageData(imgData, 0, 0)
                resolve({
                    url: canvasEl.toDataURL(),
                })

                image.onerror = (error) => {
                    reject({ image: this.srcImage, error: error });
                };
                image.src = this.srcImage;
            }
        })
    }

    private getRGBAArray(color:string): number[] | undefined{
        // Check input as hex 8 digit color
        let m = /^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/.exec(color);
        if(m) {
        return [parseInt(m[2], 16), parseInt(m[3], 16) , parseInt(m[4], 16), parseInt(m[1], 16)];
        }

        // Check input as rgba/rgb color
        m = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/.exec(color);

        if (m) {
            if (m[4] !== undefined && !isNaN(parseFloat(m[4]))) {
                return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3]), Math.round(parseFloat(m[4]) * 255)];
            } else {
                return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3]), 255];
            }
        }

        // Check input as hex 6-digit color
        m = /^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/.exec(color);
        if(m) {
        return [parseInt(m[1], 16), parseInt(m[2], 16) , parseInt(m[3], 16), 255];
        }
    }
}

export default TintColor