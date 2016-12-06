var maxInt = 99999; // used when calculating minimum distances
var maxWrenches = 5; // maximum number of wrenches a bot can hold

var wrenches;
var bots;
var others;

// returns the chessboard distance between two objects
function getDistance(x1, y1, x2, y2) {
    return Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
}

// returns true if both objects are within 1 chessboard distance
function nextTo(x1, y1, x2, y2) {
    if (Math.abs(x2 - x1) <= 1 && Math.abs(y2 - y1) <= 1)
        return true;
    return false;
}

// attacks an other if they are next to the given bot
function attack(bot) {
    for (var i = 0; i < others.length; i++) {
        if (nextTo(bot.x, bot.y, others[i].x, others[i].y)) {
            bot.attack(others[i]);
            console.log(bot + " has attacked " + others[i]);
            return true;
        }
    }
    
    return false;
}

// given a bot and list of wrenches, returns the information of the closest wrench
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

// given a bot and information for a wrench, moves the bot towards that wrench
function moveTowardsWrench(bot, wrenchInfo) {
    if (wrenchInfo.dist == 0)
        bot.collect();
    else
        bot.moveTo(wrenches[wrenchInfo.i]);
    wrenches.splice(wrenchInfo.i, 1);
    return wrenches;
}

// moves the given bot randomly
function moveRandomly(bot) {
    toMoveX = Math.floor(Math.random() * 3 - 1) + bot.x;
    toMoveY = Math.floor(Math.random() * 3 - 1) + bot.y;
    bot.moveTo({x: toMoveX, y: toMoveY});
}

function play(state){
    wrenches = state.wrenches;
    bots = state.bots;
    others = state.others;
    
    for (var i = 0; i < state.bots.length; i++) {
        var bot = state.bots[i];
        
        if (attack(bot)) continue;
        
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
