class SpiderWeb extends BasePage {
	public constructor() {
		super();
	}

	private spideWebDefault:eui.Image; // 紫色小的怪物

	public TYPE_STATUS:string = 'spideWeb';
	public TYPE_NAME:string = 'spideWeb';

	public JUMP_DISTANCE:number=120;  // 跳跃的多少米
	private skinsData:Object; //　存放皮肤对象



	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.setInitData();
	}
	private setInitData(){
		this.setJumpeHeight();
		this.setSkinData();
		this.showMonsterSkin();
	}
	private setJumpeHeight() {
		this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
	}
	public setSkinData(){
		let self = this;
		this.skinsData = {
			'normal':self.spideWebDefault
		}
	}
	public showMonsterSkin(){
		let nowStick;

		this.hideAllChildren();
		nowStick = this.skinsData[this.COLOR_STATUS]
		nowStick.visible = true;
		this.setThisWidthHeight({
			width:nowStick.width,
			height:nowStick.height
		});
	}
	
}