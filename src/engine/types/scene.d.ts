import Scene from "../core/Scene"

export interface GameScene{
    addUIElement(element: UIElement): void
    removeUIElement(element: UIElement): void
    addGameObject(gameObject: GameObject): void
    removeGameObject(gameObject: GameObject): void
    update(deltaTime: number): void
    render(ctx: CanvasRenderingContext2D, delta: number): void
    onEnter(): void
    handleInput(): Scene | undefined
}