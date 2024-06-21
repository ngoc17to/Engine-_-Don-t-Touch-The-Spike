class InputHandler {
    private static instance: InputHandler;

    private keyStates: { [key: string]: boolean } = {};
    private mousePosition: { x: number; y: number } = { x: 0, y: 0 };
    private mouseButtonStates: { [button: string]: boolean } = {
      left: false,
      middle: false,
      right: false,
    };
  
    private constructor(canvas: HTMLCanvasElement) {
        // Keyboard handle
        window.addEventListener('keydown', (e) => {
            e.preventDefault();
            this.keyStates[e.key] = true;
        });
        window.addEventListener('keyup', (e) => {
            e.preventDefault();
            this.keyStates[e.key] = false;
        });
    
        // mouse handle
        canvas.addEventListener('mousemove', (e) => {
            this.mousePosition = { x: e.clientX, y: e.clientY };
        });
        canvas.addEventListener('mousedown', (e) => {
            this.mouseButtonStates[
            e.button === 0 ? 'left' : e.button === 1 ? 'middle' : 'right'
            ] = true;
        });
        canvas.addEventListener('mouseup', (e) => {
            this.mouseButtonStates[
            e.button === 0 ? 'left' : e.button === 1 ? 'middle' : 'right'
            ] = false;
        });
    }
  
    public static getInstance(canvas: HTMLCanvasElement): InputHandler {
        if (!InputHandler.instance) {
            InputHandler.instance = new InputHandler(canvas);
        }
        return InputHandler.instance;
    }
  
    public isKeyDown(key: string): boolean {
        return this.keyStates[key] === true;
    }
  
    public isAnyKeyDown(keys: string[]): boolean {
        return keys.some((key) => this.isKeyDown(key));
    }
  
    public getMousePosition(): { x: number; y: number } {
        return this.mousePosition;
    }
  
    public isMouseButtonDown(button: 'left' | 'middle' | 'right'): boolean {
        return this.mouseButtonStates[button];
    }

    public isClicked(): boolean {
        return this.isMouseButtonDown('left') || 
                this.isMouseButtonDown('middle') || 
                this.isMouseButtonDown('right')
    }
}
  
export default InputHandler;