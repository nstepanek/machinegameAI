var maxInt = 99999;
var maxWrenches = 5;

function getDistance(x1, y1, x2, y2) {
    return Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
}

function getClosestWrench(bot, wrenches) {
    var minDist = maxInt;
    var minI = -1;
    var distances = [];
    for (var i = 0; i < wrenches.length; i++) {
        dist = getDistance(bot.x, bot.y, wrenches[i].x, wrenches[i].y);
        if (dist < minDist) {
            minDist = dist;
            minI = i;
        }
        distances.push(dist);
    }
    
    console.log(distances);
    return {i: minI, dist: minDist}
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
                if (closestWrenchInfo.dist == 0)
                    bot.collect();
                else
                    bot.moveTo(wrench);
                wrenches.splice(closestWrenchInfo.i, 1);
            }
            else console.log("No wrenches detected for bot " + i);
        }
        else { // otherwise do something else
            bot.build();
            
        }
        
    }
}
