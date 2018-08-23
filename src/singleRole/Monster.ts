class Monster extends BaseProps {
    constructor(skinName){
        super();
        this.createPropSkin(MonsterSkin,skinName);
        // this.setChildXY(sticketObj);
    }
    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
    protected childrenCreated():void
	{
		super.childrenCreated();

	}
    public TYPE_NAME = 'monsterProp';
}