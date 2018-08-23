// class Trampoline extends BasePage{
// 	public constructor() {
// 		super();
// 	}
// 	public TYPE_NAME:string="trampoline";
// 	public TYPE_STATUS:string='up';
// 	public TYPE_UP:string='up';
// 	public TYPE_DOWN:string='down';
// 	public JUMP_DISTANCE:number=400;
// 	public UP_DISTANCE:number = 80;
// 	public DOWN_DISTANCE:number = 100;
// 	// public COLOR_STATUS:string='normal';
// 	// public COLOR_DEFAULE:string='normal';
// 	private tramTopDefault:eui.Image;
// 	private tramDownDefault:eui.Image;
// 	private skinsData:Object;
// 	protected partAdded(partName:string,instance:any):void
// 	{
// 		super.partAdded(partName,instance);
// 	}
// // hideAllChildren
// 	protected childrenCreated():void
// 	{
// 		super.childrenCreated();
// 	}
// 	public setInitAllData() {
// 		this.setSkinData();
// 		this.setJumpeHeight();
// 	}
// 	private setJumpeHeight() {
// 		this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
// 	}
// 	public setSkinData(){
// 		let self = this;
// 		this.skinsData = {
// 			'normal':{
// 				'up':self.tramTopDefault,
// 				'down':self.tramDownDefault
// 			}
// 		}
// 		this.setThisWidthHeight({
// 			width:this.skinsData[this.COLOR_STATUS][this.TYPE_DOWN].width,
// 			height:this.skinsData[this.COLOR_STATUS][this.TYPE_DOWN].height
// 		});
// 	}
// 	public playShowDownTram() {
// 		this.hideAllChildren();
// 		this.skinsData[this.COLOR_STATUS][this.TYPE_DOWN].visible=true;
// 		this.setThisWidthHeight({
// 			width:this.skinsData[this.COLOR_STATUS][this.TYPE_DOWN].width,
// 			height:this.skinsData[this.COLOR_STATUS][this.TYPE_DOWN].height
// 		});
// 		setTimeout(()=>{
// 			this.hideAllChildren();
// 			this.skinsData[this.COLOR_STATUS][this.TYPE_UP].visible=true;
// 			this.setThisWidthHeight({
// 				width:this.skinsData[this.COLOR_STATUS][this.TYPE_UP].width,
// 				height:this.skinsData[this.COLOR_STATUS][this.TYPE_UP].height
// 			});
// 		},50)
// 	}
// } 
//# sourceMappingURL=Trampoline.js.map