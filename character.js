var fs = require('fs');
var readLineSync = require('readline-sync');
function ChoixDuCaratere(PersonnageTab) {
    var nomPersonnages = PersonnageTab.map(function (perso) {
        return (perso.name);
    });
    var indexchoisi = readLineSync.keyInSelect(nomPersonnages, 'what is your character?');
    return (PersonnageTab[indexchoisi]);
}
function ChoixDeEnemies(EnemiesTab) {
    var randomIndex = Math.floor(Math.random() * EnemiesTab.length);
    var EnemieAlea = EnemiesTab[randomIndex];
    return EnemieAlea;
}
function ChoixDuBoss(BossTab) {
    var randomIndex = Math.floor(Math.random() * BossTab.length);
    var BossAlea = BossTab[randomIndex];
    return BossAlea;
}
function main() {
    // Recuperation dinamic des personnages
    var PersonnageTab = JSON.parse(fs.readFileSync('./players.json', 'utf-8'));
    var BossTab = JSON.parse(fs.readFileSync('./bosses.json', 'utf-8'));
    var EnemiesTab = JSON.parse(fs.readFileSync('./enemies.json', 'utf-8'));
    // Choix aletoire des personnsage 
    var BossChoisi = ChoixDuBoss(BossTab);
    var EnemiesChoisi = ChoixDeEnemies(EnemiesTab);
    var personnageChoisi = ChoixDuCaratere(PersonnageTab);
    var players = [personnageChoisi, EnemiesChoisi, BossChoisi];
    var enemies = [EnemiesChoisi, BossChoisi];
    var bosses = [BossChoisi];
    var enemy;
    for (var i = 0; i < players.length; i++) {
        var player = players[i];
        var randomIndex = Math.floor(Math.random() * enemies.length);
        enemy = enemies[randomIndex];
        var victory_1 = (player[i], enemy);
        if (!victory_1) {
            break;
        }
    }
    var victory;
    for (var i = 0; i < 9; i++) {
        var boss = bosses[i];
        victory = Fight(players[i], enemy);
        if (!victory) {
            break;
        }
    }
    victory = Fight(players[2], enemy);
    if (victory) {
        console.log("".concat(players[0].name, " has defeated Ganon and saved the princess!"));
    }
    else {
        console.log("".concat(players[0].name, " has been defeated by Ganon..."));
    }
}
function Attack(personnage, enemies) {
    console.log("".concat(personnage.name, " attack ").concat(enemies.name));
    enemies.hp -= personnage.str;
    console.log("".concat(enemies.name, " has ").concat(enemies.hp, " HP left"));
}
function Heal(personnage) {
    console.log("".concat(personnage.name, " heals himself"));
    personnage.hp += personnage.hp / 2.;
    console.log("".concat(personnage.name, " has ").concat(personnage.hp, " HP left"));
}
function Fight(personnageChoisi, EnemiesChoisi) {
    var rounds = 0; // variable pour compter le nombre de tours
    while (personnageChoisi.hp > 0 && EnemiesChoisi.hp > 0 && rounds < 9) {
        rounds++; // incrémente le nombre de tours à chaque fois qu'un tour se termine
        var playerAction = readLineSync.question('What do you want to do? (Attack/Heal) (1/2) : ');
        if (playerAction.toLowerCase() === '1') {
            Attack(personnageChoisi, EnemiesChoisi);
        }
        else if (playerAction.toLowerCase() === '2') {
            Heal(personnageChoisi);
        }
        else {
            console.log('Invalid input, try again.');
            continue;
        }
        if (EnemiesChoisi.hp <= 0) {
            console.log("".concat(EnemiesChoisi.name, " is defeated"));
            return true;
        }
        console.log("".concat(EnemiesChoisi.name, " attacks ").concat(personnageChoisi.name));
        personnageChoisi.hp -= EnemiesChoisi.str;
        console.log("".concat(personnageChoisi.name, " has ").concat(personnageChoisi.hp, " HP left"));
    }
    if (personnageChoisi.hp > 0 && EnemiesChoisi.hp <= 0) {
        console.log("Congratulations! You have defeated ".concat(EnemiesChoisi.name, " and reached the final boss Ganon!"));
        return true;
    }
    if (personnageChoisi.hp <= 0) {
        console.log("".concat(personnageChoisi.name, " is defeated"));
    }
    if (rounds >= 9) {
        console.log("You have reached the end of the game, but you have not defeated the final boss Ganon. Game Over.");
    }
    return false;
}
main();
