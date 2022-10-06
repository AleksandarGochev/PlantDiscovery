function plantDiscovery(input){

    let actions = {
        'Rate': rate,
        'Update': update,
        'Reset': reset,


    }






    let n = Number(input.shift());
    let plantBook = {};
    
    for(let i = 0; i < n; i ++){
       let [name, rarity] = input.shift().split('<->');
      
            plantBook[name] = {
                rarity : Number(rarity),
                ratings : [],
                avrRating : 0,
            }

        }
       

        

        
    

    
        while(input[0] != 'Exhibition'){
            let [command, params] = input.shift().split(': ');
            let action = actions[command];
            action(params);
            

        }

        function rate(line){
            let [name, rating] = line.split(' - ');
            if(plantBook[name] != undefined){
                let plant = plantBook[name];
                plant.ratings.push(Number(rating));

                let total = 0;
                for(let rating of plant.ratings){
                    total += rating;
                }
                plant.avrRating = total/ plant.ratings.length

            }else{
                console.log('error')
            }
        }


        function update(line){
            let [name, rarity] = line.split(' - ');
            if(plantBook[name] != undefined){
              let plant = plantBook[name];
              plant.rarity = Number(rarity);

              
            }else{
                console.log('error')
            }


        }


        function reset(name){
            if(plantBook[name] != undefined){
                let plant = plantBook[name]
                plant.ratings.length = 0;
                plant.avrRating = 0;
            }else{
                console.log('error')
            }

        }

        let sorted = Object.entries(plantBook).sort(comparePlants);
        
       

        function comparePlants(a, b){
            

            let rarityA = a[1].rarity;
            let rarityB = b[1].rarity
            
            let ratingA = a[1].avrRating;
            let ratingB = b[1].avrRating;

            return (rarityB - rarityA) || (ratingB - ratingA);
        }
        console.log('Plants for the exhibition:');
        for(let [name, plant] of sorted){
            console.log(`- ${name}; Rarity: ${plant.rarity}; Rating: ${plant.avrRating.toFixed(2)}`)


        }

        







}
plantDiscovery(['3',
    'Arnoldii<->4',
    'Woodii<->7',
    'Welwitschia<->2',
    'Rate: Woodii - 10',
    'Rate: Welwitschia - 7',
    'Rate: Arnoldii - 3',
    'Rate: Woodii - 5',
    'Update: Woodii - 5',
    'Reset: Arnoldii',
    'Exhibition',
])