var maxInt = 99999;
var maxWrenches = 5;
var wrenches;

function getDistance(x1, y1, x2, y2) {
    return Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
}

function getClosestWrench(bot, wrenches) {
    var minDist = maxInt;
    var minI = -1;
    //var distances = [];
    for (var i = 0; i < wrenches.length; i++) {
        dist = getDistance(bot.x, bot.y, wrenches[i].x, wrenches[i].y);
        if (dist < minDist) {
            minDist = dist;
            minI = i;
        }
        //distances.push(dist);
    }
    
    //console.log(distances);
    return {i: minI, dist: minDist}
}

function moveTowardsWrench(bot, wrenchInfo) {
    if (wrenchInfo.dist == 0)
        bot.collect();
    else
        bot.moveTo(wrenches[wrenchInfo.i]);
    wrenches.splice(wrenchInfo.i, 1);
    return wrenches;
}

function moveRandomly(bot) {
    toMoveX = Math.floor(Math.random() * 3 - 1) + bot.x;
    toMoveY = Math.floor(Math.random() * 3 - 1) + bot.y;
    bot.moveTo({x: toMoveX, y: toMoveY});
    //console.log("Random move " + toMoveX + " " + toMoveY);
}

function play(state){
    wrenches = state.wrenches;
    
    for (var i = 0; i < state.bots.length; i++) {
        var bot = state.bots[i];
        
        // if getting a wrench is possible (bot.wrenches < 5)
        if (bot.wrenches < maxWrenches) {
            var closestWrenchInfo = getClosestWrench(bot, wrenches);
            var wrench = wrenches[closestWrenchInfo.i];
            
            if (closestWrenchInfo.dist != maxInt) {
                moveTowardsWrench(bot, closestWrenchInfo);
                
            }
            else moveRandomly(bot);

        }
        else { // otherwise do something else
            bot.build();
            
        }
        
    }
}
