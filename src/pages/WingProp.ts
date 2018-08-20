class WingProp extends BasePage {
	public constructor() {
		super();
	}
	public TYPE_STATUS:string='wing';
	public TYPE_NAME:string="wing";
	private wingDefault:eui.Image;
	private skinsData:Object;
	public JUMP_DISTANCE:number=1000;
	public UP_DISTANCE:number = 80;
	public DOWN_DISTANCE:number = 100;
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
	public setInitAllData() {
		
	}
	private setJumpeHeight() {
		this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
	}
	public setSkinData(){
		let self = this;
		this.skinsData = {
			'normal':self.wingDefault
		}
	}
	public playShowDownTram() {
		this.hideAllChildren();
		this.skinsData[this.COLOR_STATUS].visible=true;
	}
	
}