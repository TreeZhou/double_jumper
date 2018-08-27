class ProtectionProp extends BaseProps {
    constructor(sticketObj){
        super();
        this.createPropSkin(ProtectionPropSkin,'protectionProp');
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
    public TYPE_NAME = 'protectionProp';
    public JUMP_DISTANCE:number = 80;

}