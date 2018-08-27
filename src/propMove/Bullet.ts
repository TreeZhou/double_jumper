class Bullet extends BaseProps {
    constructor(sticketObj){
        super();
        this.createPropSkin(BulletSkin,'bullet');
    }
    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
    protected childrenCreated():void
	{
		super.childrenCreated();

	}
    public TYPE_NAME = 'bulletProp';

}