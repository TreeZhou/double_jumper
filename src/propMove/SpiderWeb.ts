class SpiderWeb extends BaseProps {
    constructor(sticketObj){
        super();
        this.createPropSkin(SpideWebSkin,'spideWeb');
        this.setChildXY(sticketObj);
    }
    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
    protected childrenCreated():void
	{
		super.childrenCreated();

	}
    public TYPE_NAME = 'spiderWebProp';
    public JUMP_DISTANCE:number = 200;
}