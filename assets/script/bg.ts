

const {ccclass, property} = cc._decorator;

@ccclass
export default class bg extends cc.Component {

    @property({ type: cc.Node, tooltip: "水波纹节点" })
    ripple_node: cc.Node = null;
    @property({ type: [cc.Node], tooltip: "三种小鱼资源" })
    fish_res: cc.Node[] = Array<cc.Node>();
    @property({ type: [cc.Node], tooltip: "起始与结束位置" })
    pos_start: cc.Node[] = Array<cc.Node>();
    @property({ type: [cc.Node], tooltip: "途径位置1" })
    pos_move: cc.Node[] = Array<cc.Node>();
    @property({ type: [cc.Node], tooltip: "途径位置2" })
    pos_end: cc.Node[] = Array<cc.Node>();

    //内部属性
    random_ripple_time: number = Math.random() * 120 + 180;//下一次生成水波的时间
    cur_ripple_time: number = 0;//水波生成倒计时

    cur_fish_time: number = 0;//小鱼生成倒计时
    fish_type: number = null;//小鱼的类型
    pre_pos: cc.Vec2 = null;//上一帧的小鱼坐标

    onLoad()
    { 
        this.playRipple();
        this.playFish();
    }

    start() 
    {

    }

    playRipple()
    {
        let posx: number = Math.random() * 720 - 360;
        let posy: number = Math.random() * 1280 - 640;
        this.ripple_node.setPosition(posx, posy);
        this.ripple_node.getComponent(cc.Animation).play("ripple");
    }

    playFish()
    {
        //随机获取一条鱼
        this.fish_type = Math.floor(Math.random() * 3);
        for (let i: number = 0; i < 3; i++)
        {
            if (i == this.fish_type)
            {
                this.fish_res[i].active = true;
            }
            else
            {
                this.fish_res[i].active = false;
            }
        }
        //随机获取3个点，分别作为起始点，经过点，结束点
        let start: number = Math.floor(Math.random() * 4);
        let startPos: cc.Vec2 = cc.v2(this.pos_start[start].position.x, this.pos_start[start].position.y);

        let start2: number = Math.floor(Math.random() * 4);
        let startPos2: cc.Vec2 = cc.v2(this.pos_start[start2].position.x, this.pos_start[start2].position.y);

        let move: number = Math.floor(Math.random() * 3);
        let movePos: cc.Vec2 = cc.v2(this.pos_move[move].position.x, this.pos_move[move].position.y);

        let end: number = Math.floor(Math.random() * 3);
        let endPos: cc.Vec2 = cc.v2(this.pos_end[end].position.x, this.pos_end[end].position.y);

        this.fish_res[this.fish_type].setPosition(startPos);
        this.pre_pos = startPos;

        let arr: cc.Vec2[] = [startPos, movePos, endPos, startPos2];
        this.fish_res[this.fish_type].runAction(cc.cardinalSplineTo(8, arr, 0));
    }

    /**
     * 给定两个点，返回他们之间的角度
     * @param pos1 第一个点二维坐标
     * @param pos2 第二个点的二维坐标
     */
    getAngle(pos1: cc.Vec2, pos2: cc.Vec2): number
    {
        var x = pos2.x - pos1.x;
        var y = pos2.y - pos1.y;
        var hypotenuse = Math.sqrt(x * x + y * y);
        var cos = x / hypotenuse;
        var radian = Math.acos(cos);
        //弧度
        var angle = 180 / (Math.PI / radian);
        //角度
        if (y < 0)
        {
            angle = 0 - angle;
        }
        else if (y == 0 && x < 0)
        {
            angle = 180;
        }
        return 90 - angle;
    }

    update(dt)
    {
        //随机生成水波
        if (this.cur_ripple_time > this.random_ripple_time)
        {
            this.playRipple();
            this.cur_ripple_time = 0;
            this.random_ripple_time = Math.random() * 120 + 180;
        }
        else
        {
            this.cur_ripple_time++;
        }
        //小鱼转动角度
        let cur_pos: cc.Vec2 = cc.v2(this.fish_res[this.fish_type].position.x, this.fish_res[this.fish_type].position.y);
        var angle = this.getAngle(this.pre_pos, cur_pos);
        this.fish_res[this.fish_type].angle = -angle;
        this.pre_pos = cur_pos;
        //随机生成小鱼
        if (this.cur_fish_time > 8)
        {
            this.cur_fish_time = 0;
            this.playFish();
        }
        else
        {
            this.cur_fish_time += dt;
        }
    }
}
