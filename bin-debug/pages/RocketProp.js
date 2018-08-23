// class RocketProp extends BasePage {
// 	public constructor() {
// 		super();
// 	}
// 	public TYPE_STATUS:string='rocket';
// 	public TYPE_NAME:string="rocket";
// 	private rocketDefault:eui.Image;
// 	private skinsData:Object;
// 	public JUMP_DISTANCE:number=1500;
// 	public UP_DISTANCE:number = 80;
// 	public DOWN_DISTANCE:number = 100;
// 	protected partAdded(partName:string,instance:any):void
// 	{
// 		super.partAdded(partName,instance);
// 	}
// 	protected childrenCreated():void
// 	{
// 		super.childrenCreated();
// 		this.setInitAllData();
// 	}
// 	public setInitAllData() {
// 		this.setSkinData();
// 		this.setJumpeHeight();
// 		this.playShowDownTram();
// 	}
// 	public setSkinData(){
// 		let self = this;
// 		this.skinsData = {
// 			'normal':self.rocketDefault
// 		}
// 	}
// 	private setJumpeHeight() {
// 		this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
// 	}
// 	public playShowDownTram() {
// 		this.hideAllChildren();
// 		this.skinsData[this.COLOR_STATUS].visible=true;
// 		this.setThisWidthHeight({
// 			width:this.skinsData[this.COLOR_STATUS].width,
// 			height:this.skinsData[this.COLOR_STATUS].height
// 		});
// 	}
// } 
//# sourceMappingURL=RocketProp.js.map