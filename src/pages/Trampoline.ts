class Trampoline extends BasePage{
	public constructor() {
		super();
	}
	public TYPE_NAME:string="trampoline";
	public TYPE_STATUS:string='up';
	public TYPE_UP:string='up';
	public TYPE_DOWN:string='down';
	public JUMP_DISTANCE:number=700;

	// public COLOR_STATUS:string='normal';
	// public COLOR_DEFAULE:string='normal';

	private tramTopDefault:eui.Image;
	private tramDownDefault:eui.Image;

	private skinsData:Object;

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
// hideAllChildren

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.setSkinData();
		this.setJumpeHeight();
	}
	private setJumpeHeight() {
		this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
	}
	public setSkinData(){
		let self = this;
		this.skinsData = {
			'normal':{
				'up':self.tramTopDefault,
				'down':self.tramDownDefault
			}
		}
	}
	public playShowDownTram() {
		this.hideAllChildren();
		this.skinsData[this.COLOR_STATUS][this.TYPE_DOWN].visible=true;
		setTimeout(()=>{
			this.hideAllChildren();
			this.skinsData[this.COLOR_STATUS][this.TYPE_UP].visible=true;
		},50)
	}
	
}