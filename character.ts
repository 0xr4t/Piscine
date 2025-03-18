const fs = require('fs');
const readLineSync = require('readline-sync');

interface Personnage { 
    id: number,
    name: string,
    hp: number,
    mp: number,
    str: number,
    int: number,
    def: number,
    res: number,
    spd: number,
    luck: number,
    race: number,
    class: number,
    rarity: number,
}

function ChoixDuCaratere(PersonnageTab: Personnage[])  {
    let nomPersonnages = PersonnageTab.map(perso => { 
        return (perso.name)
    });
    let indexchoisi = readLineSync.keyInSelect(nomPersonnages, 'what is your character?');
    return (PersonnageTab[indexchoisi]);
}

function ChoixDeEnemies(EnemiesTab: Personnage [])  {
    const randomIndex = Math.floor(Math.random() * EnemiesTab.length);
    const EnemieAlea = EnemiesTab[randomIndex];
    return EnemieAlea;
}

function ChoixDuBoss(BossTab: Personnage [])  {
    const randomIndex = Math.floor(Math.random() * BossTab.length);
    const BossAlea = BossTab[randomIndex];
    return BossAlea;
}

function main()
{
    // Recuperation dinamic des personnages
    const PersonnageTab : Personnage[] = JSON.parse(fs.readFileSync('./players.json', 'utf-8'));
    const BossTab : Personnage[] = JSON.parse(fs.readFileSync('./bosses.json', 'utf-8'));
    const EnemiesTab : Personnage[] = JSON.parse(fs.readFileSync('./enemies.json', 'utf-8'));
    // Choix aletoire des personnsage 
    let BossChoisi = ChoixDuBoss(BossTab);
 
    let EnemiesChoisi = ChoixDeEnemies(EnemiesTab);
    let personnageChoisi  = ChoixDuCaratere(PersonnageTab);
    const players : Personnage[] = [personnageChoisi, EnemiesChoisi, BossChoisi];
    const enemies = [EnemiesChoisi, BossChoisi];
    const bosses = [BossChoisi];
    let  enemy;
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        const randomIndex = Math.floor(Math.random() * enemies.length);
        enemy = enemies[randomIndex];
        const victory = (player[i],enemy);
        if (!victory) {
            break;
        }
    }
    let victory;
    for (let i = 0; i < 9; i++) {
        const boss = bosses[i];
        victory = Fight(players[i], enemy);
        if (!victory) {
            break;
        }
    }
    victory = Fight(players[2], enemy);
    if (victory) {
        console.log(`${players[0].name} has defeated Ganon and saved the princess!`);
    } else {
        console.log(`${players[0].name} has been defeated by Ganon...`);
    }
}

function Attack(personnage : Personnage, enemies : Personnage)
{    
    console.log(`${personnage.name} attack ${enemies.name}`);
    enemies.hp -= personnage.str;
    console.log(`${enemies.name} has ${enemies.hp} HP left`);
}

function Heal(personnage: Personnage){
    console.log(`${personnage.name} heals himself`);
    personnage.hp += personnage.hp / 2.
    console.log(`${personnage.name} has ${personnage.hp} HP left`);
}

function Fight(personnageChoisi: Personnage, EnemiesChoisi: Personnage) {
    let rounds = 0; // variable pour compter le nombre de tours
    while (personnageChoisi.hp > 0 && EnemiesChoisi.hp > 0 && rounds < 9) {
    rounds++; // incrémente le nombre de tours à chaque fois qu'un tour se termine
    const playerAction = readLineSync.question('What do you want to do? (Attack/Heal) (1/2) : ');
    if (playerAction.toLowerCase() === '1') {
    Attack(personnageChoisi, EnemiesChoisi);
    } else if (playerAction.toLowerCase() === '2') {
    Heal(personnageChoisi);
    } else {
    console.log('Invalid input, try again.');
    continue;
    }
    if (EnemiesChoisi.hp <= 0) {
    console.log(`${EnemiesChoisi.name} is defeated`);
    return true;
    }
    console.log(`${EnemiesChoisi.name} attacks ${personnageChoisi.name}`);
    personnageChoisi.hp -= EnemiesChoisi.str;
    console.log(`${personnageChoisi.name} has ${personnageChoisi.hp} HP left`);
    }
    if (personnageChoisi.hp > 0 && EnemiesChoisi.hp <= 0) {
    console.log(`Congratulations! You have defeated ${EnemiesChoisi.name} and reached the final boss Ganon!`);
    return true;
    }
    if (personnageChoisi.hp <= 0) {
    console.log(`${personnageChoisi.name} is defeated`);
    }
    if (rounds >= 9) {
    console.log(`You have reached the end of the game, but you have not defeated the final boss Ganon. Game Over.`);
    }
    return false;
    }

main();