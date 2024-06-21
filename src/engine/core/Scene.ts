import GameObject from "./GameObject"
import UIElement from "../ui/UIElement";
import { GameScene } from "../types/scene";

class Scene implements GameScene{
    protected objects: GameObject[]
    protected uiElements: UIElement[];
    
    constructor(){
        this.uiElements = [];
        this.objects = []
    }

    public handleInput(): Scene | undefined {
        console.log("Handle Input");
        return this
    }

    public onEnter(): void {
        console.log("Scene setup");
    }

    public addUIElement(element: UIElement): void {
        this.uiElements.push(element);
    }

    public removeUIElement(element: UIElement): void {
        const index = this.uiElements.indexOf(element);
        if (index !== -1) {
          this.uiElements.splice(index, 1);
        }
    }

    public addGameObject(gameObject: GameObject): void {
        this.objects.push(gameObject)
    }

    public removeGameObject(gameObject: GameObject): void {
        const index = this.objects.indexOf(gameObject)
        if (index !== -1) {
          this.objects.splice(index, 1)
        }
    }

    public update(deltaTime: number): void {
        for (const object of this.objects) {
            object.update(deltaTime)
        }
    }
    
    public render(ctx: CanvasRenderingContext2D, delta: number): void {
        for (const object of this.objects) {
            object.render(ctx, delta)
        }

        for (const element of this.uiElements) {
            element.render(ctx);
        }
    }
}

export default Scene