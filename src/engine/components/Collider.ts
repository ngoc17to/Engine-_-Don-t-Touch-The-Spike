import Vector2 from "./Vector2";
import Transform from "./Transform";

export abstract class Collider {
    transform: Transform;
    width: number
    height: number

    abstract checkCollision(other: Collider): boolean;
}

export class BoxCollider extends Collider {
    transform: Transform
    width: number
    height: number

    constructor(width: number, height: number, x: number, y: number) {
        super()
        this.width = width
        this.height = height
        this.transform = new Transform(x, y)
    }

    public setPosition(x: number, y: number): void {
        this.transform.setPosition(x, y)
    }

    public checkCollision(other: Collider): boolean {
        if (other instanceof BoxCollider) {
            return this.checkCollisionBox(other);
        } 
        else if (other instanceof TriangleCollider) {
            return this.checkCollisionTriangle(other);
        }
        return false;
    }

    private checkCollisionBox(other: BoxCollider): boolean {
        // Implement box-box intersection logic
        return false
    }
    
    public checkCollisionTriangle(other: TriangleCollider): boolean {
        // Implement box-triangle intersection logic
        const vertices = other.getVertices();
        const xPos = this.transform.getPosition().x
        const yPos = this.transform.getPosition().y
        // Check if any of the triangle's vertices are inside the box
        for (const vertex of vertices) {
            if (
                vertex.x >= xPos &&
                vertex.x <= xPos + this.width &&
                vertex.y >= yPos &&
                vertex.y <= yPos + this.height
            ) {
                return true;
            }
        }
        // Check if any of the box's vertices are inside the triangle
        const boxVertices: Vector2[] = [
            new Vector2(xPos, yPos),
            new Vector2(xPos + this.width, yPos),
            new Vector2(xPos + this.width, yPos + this.height),
            new Vector2(xPos, yPos + this.height),
        ]
        for (const vertex of boxVertices) {
            if (other.isPointInTriangle(vertex)) {
                return true;
            }
        }
    
        return false;
    }

}

export class TriangleCollider extends Collider {
    vertex1: Vector2;
    vertex2: Vector2;
    vertex3: Vector2;

    constructor(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
        super();
        this.transform = new Transform(0, 0);
        this.vertex1 = new Vector2(x1, y1);
        this.vertex2 = new Vector2(x2, y2);
        this.vertex3 = new Vector2(x3, y3);
    }

    public setPosition(x: number, y: number): void {
        this.transform.setPosition(x, y);
    }

    public getVertices(): Vector2[] {
        return [this.vertex1, this.vertex2, this.vertex3];
    }

    public checkCollision(other: Collider): boolean {
        if (other instanceof BoxCollider) {
            return other.checkCollisionTriangle(this);
        } else if (other instanceof TriangleCollider) {
            return this.checkCollisionTriangle(other);
        }
        return false;
    }

    public checkCollisionTriangle(other: TriangleCollider): boolean {
        // Implement triangle-triangle intersection logic
        // const vertices1 = this.getVertices();
        // const vertices2 = other.getVertices();

        // for (let i = 0; i < 3; i++) {
        //     const edge1 = {
        //         start: vertices1[i],
        //         end: vertices1[(i + 1) % 3],
        //     };

        //     for (let j = 0; j < 3; j++) {
        //         const edge2 = {
        //             start: vertices2[j],
        //             end: vertices2[(j + 1) % 3],
        //         };

        //         if (this.checkIntersection(edge1.start, edge1.end, edge2.start, edge2.end)) {
        //             return true;
        //         }
        //     }
        // }

        return false;
    }

    public isPointInTriangle(p: Vector2): boolean {
        const a = this.vertex1
        const b = this.vertex2
        const c = this.vertex3
        // Tính diện tích tam giác ABC
        const ABC = Math.abs((a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2);
      
        // Tính diện tích tam giác PAB, PBC, PCA
        const PAB = Math.abs((p.x * (a.y - b.y) + a.x * (b.y - p.y) + b.x * (p.y - a.y)) / 2);
        const PBC = Math.abs((p.x * (b.y - c.y) + b.x * (c.y - p.y) + c.x * (p.y - b.y)) / 2);
        const PCA = Math.abs((p.x * (c.y - a.y) + c.x * (a.y - p.y) + a.x * (p.y - c.y)) / 2);
      
        // Kiểm tra xem tổng diện tích tam giác con có bằng diện tích tam giác ABC không
        return ABC === PAB + PBC + PCA;
    }
}