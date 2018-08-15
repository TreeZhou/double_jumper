class RocketProp extends BasePage {
	public constructor() {
		super();
	}
	public TYPE_STATUS:string='rocket';
	public TYPE_NAME:string="rocket";
	private rocketDefault:eui.Image;
	private skinsData:Object;
	public JUMP_DISTANCE:number=1000;
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.setSkinData();
		this.setJumpeHeight();
	}
	public setSkinData(){
		let self = this;
		this.skinsData = {
			'normal':self.rocketDefault
		}
	}
	private setJumpeHeight() {
		this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
	}
	public playShowDownTram() {
		this.hideAllChildren();
		this.skinsData[this.COLOR_STATUS].visible=true;
	}
}