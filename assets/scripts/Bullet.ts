import { _decorator, Component, Node, Vec3, Collider2D, Contact2DType, IPhysics2DContact, Prefab, instantiate } from 'cc';
import { Plane } from './Plane';
import { ButtonPlayScene } from './ButtonPlayScene';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    public bulletSpeed: number = 10;

    @property(Prefab)
    public destroyPre: Prefab = null;

    protected start(): void {
        let collider = this.getComponent(Collider2D);
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }
    update(dt: number) {
        if(this.node.position.y > 300){
            this.node.destroy();
        }
    }
    destroyB(){
        let destroyPrefab = this.destroyPre;
        let prefabInstance = instantiate(destroyPrefab);
        prefabInstance.parent = this.node.parent;
        prefabInstance.setWorldPosition(this.node.worldPosition);
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        if(otherCollider.name.startsWith('enemy') || otherCollider.name.startsWith('boss')){
            this.destroyB();
            this.scheduleOnce(() => {selfCollider.node?.destroy()});
        }
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){

    }
}


