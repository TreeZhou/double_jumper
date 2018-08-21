class SpringShoesProp extends BasePage {
	public constructor() {
		super();
	}

	private springShoeDefault:eui.Image; // 默认的弹簧鞋

	public TYPE_STATUS:string = 'springShoes';
	public TYPE_NAME:string = 'springShoes';

	public JUMP_DISTANCE:number=100;  // 跳跃的多少米
	private skinsData:Object; //　存放皮肤对象

	// public imgW:number = 60;
	// public imgH:number = 31;



	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.setInitData();
		this.showMonsterSkin();
	}
	private setInitData(){
		this.setJumpeHeight();
		this.setSkinData();
	}
	private setJumpeHeight() {
		this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
	}
	public setSkinData(){
		let self = this;
		this.skinsData = {
			'normal':self.springShoeDefault
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