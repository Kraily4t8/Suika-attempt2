class BoundingCircle {
    constructor(x, y, r) {
        Object.assign(this, { x, y, r});

        this.bottom = this.y + this.r;
    };

    collide(oth) {
        //distance between this and oth versus their combined radii
        if(oth instanceof BoundingBox) {
            //hitting floor of beaker
            //hitting left side of beaker
            if(this.y >= oth.bottom - this.r || this.x <= oth.left + this.r || this.x >= oth.right - this.r) {
                // console.log("enter")
                return true;
            }
            return false;
        } else {
            return (getDistance(this,oth) <= this.r + oth.r);
        }
    };


    overlap(oth) {
       
    };
};