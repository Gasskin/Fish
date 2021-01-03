const {ccclass, property} = cc._decorator;

@ccclass
export default class block extends cc.Component
{
    //内部属性
    default_pos: cc.Vec2 = null;//当前位置
    cur_index: cc.Vec2 = null;//当前坐标
    block_type: String = null;//木块类型
    can_up: boolean;//属于上下移动还是左右移动
    gm_edit: boolean;//GM面板是否打开
    max_up: number = null;//能够向上移动的距离
    max_bottom: number = null;//能够向下移动的距离
    max_left: number = null;//能够想左移动的距离
    max_right: number = null;//能够向右移动的距离
    
    onLoad()
    {
        this.bindTouchFunc();
        this.gm_edit = this.node.getParent().getParent().getChildByName("GM").active;
        //cc.log(this.gm_edit);
    }

    start() 
    {
    }

    /**
     * 初始化木块
     * @param str 木块类型 
     */
    init(str: String, index: cc.Vec2)
    {
        this.block_type = str;
        this.cur_index = index;
        //cc.log("type:" + str);
        //cc.log(this.node.width);
        //cc.log(this.node.height);
        if (this.node.width > this.node.height)
        {
            this.can_up = false;
        }
        else
        {
            this.can_up = true;
        }
    }


    /**
     * 注册木块的触摸事件
     */
    bindTouchFunc()
    {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event)
        {
            //cc.log("start");
            this.default_pos = this.node.getPosition();
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event)
        {
            //cc.log("move");
            let move_dis: cc.Vec2 = event.getDelta();
            if (this.gm_edit)
            {
                this.default_pos = cc.v2(this.default_pos.x + move_dis.x, this.default_pos.y + move_dis.y);
            }
            else
            {
                //上下移动
                if (this.can_up)
                {
                    //1x2的木块y移动范围是[0,4]，1x3的木块y移动范围是[0,3]
                    switch (this.block_type)
                    {
                        case "1x2":
                            //如果是向上移动
                            if (move_dis.y > 0)
                            {
                                if (this.default_pos.y <= this.getItemPos(0, 4).y - 54)
                                {
                                    this.default_pos.y += move_dis.y;
                                }
                            }
                            //否则是向下移动
                            else
                            {
                                if (this.default_pos.y >= -334)
                                {
                                    this.default_pos.y += move_dis.y;
                                }
                            }
                            break;
                        case "1x3":
                            //如果是向上移动
                            if (move_dis.y > 0)
                            {
                                if (this.default_pos.y <= this.getItemPos(0,3).y-54)
                                {
                                    this.default_pos.y += move_dis.y;
                                }
                            }
                            //否则是向下移动
                            else
                            {
                                if (this.default_pos.y >= -334)
                                {
                                    this.default_pos.y += move_dis.y;
                                }
                            }
                            break;
                    }
                }
                //左右移动
                else
                {
                    //1x2的木块x移动范围是[0,4]，1x3的木块x移动范围是[0,3]
                    switch (this.block_type)
                    {
                        case "2x1":
                            //如果是向右移动
                            if (move_dis.x > 0)
                            {
                                if (this.default_pos.x <= this.getItemPos(4, 0).x - 54)
                                {
                                    this.default_pos.x += move_dis.x;
                                }
                            }
                            //否则是向左移动
                            else
                            {
                                if (this.default_pos.x >= -334)
                                {
                                    this.default_pos.x += move_dis.x;
                                }
                            }
                            break;
                        case "3x1":
                            //如果是向右移动
                            if (move_dis.x > 0)
                            {
                                if (this.default_pos.x <= this.getItemPos(3, 0).x - 54)
                                {
                                    this.default_pos.x += move_dis.x;
                                }
                            }
                            //否则是向左移动
                            else
                            {
                                if (this.default_pos.x >= -334)
                                {
                                    this.default_pos.x += move_dis.x;
                                }
                            }
                            break;
                    }
                }
            }
            this.node.setPosition(this.default_pos);

        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event)
        {
            //cc.log("end");
            this.cur_index = this.getItemIndex(this.default_pos.x, this.default_pos.y);
            let final_pos: cc.Vec2 = this.getItemPos(this.cur_index.x, this.cur_index.y);
            //this.node.setPosition(final_pos.x - 54, final_pos.y - 54);
            cc.tween(this.node)
                .to(0.2, { position: cc.v2(final_pos.x - 54, final_pos.y - 54) })
                .start();
            
            
        }, this);
    }

    /**
     * 输入数组坐标，获得对应屏幕坐标，左下角是(0,0)，右上角是(5,5)，行列都是从左下角开始算起
     * @param x 行
     * @param y 列
     */
    getItemPos(x: number, y: number): cc.Vec2
    {
        return cc.v2(-338 + (x + 1) * 4 + x * 108 + 54, -338 + (y + 1) * 4 + y * 108 + 54);
    }

    /**
     * 根据木块坐标计算其对应的数组编号
     * @param posX x坐标
     * @param posY y坐标
     */
    getItemIndex(posX: number, posY: number):cc.Vec2
    {
        let x: number = -1;
        let y: number = -1;
        //cc.log("pos:" + posX + "," + posY);
        for (let i: number = 0; i <= 6; i++)
        {
            if ((-280 + 112 * i) >= posX && x == -1)
            {
                x = Math.min(i, 5);
            }
            if ((-280 + 112 * i) >= posY && y == -1)
            {
                y = Math.min(i, 5);
            }
        }
        //cc.log("index:" + x + "," + y);
        return cc.v2(x,y);
    }

    // update (dt) {}
}
