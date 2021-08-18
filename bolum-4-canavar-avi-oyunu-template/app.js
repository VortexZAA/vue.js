new Vue({
    el : "#app",
    data : {
        player_heal : 100,
        monster_heal : 100,
        game_is_on : false,
        logs : [],
        atak_c : 10,
        o_atal_c : 25,
        heal_up_c : 20,
        monster_atak_c : 15,
        log_text : {
            atak : "OYUNCU ATAĞI : ",
            o_atak : "ÖZEL OYUNCU ATAĞI : ",
            monster_atak : "CANAVAR ATAĞI : ",
            heal_up : "İLK YARDIM",
            give_up : "OYUNCU PES ETTİ!!!",
            
        }

        


    },
    methods : {
        start_game : function(){
            this.game_is_on = true;

        },
        atak: function(){
            var point = Math.ceil( Math.random() * this.atak_c);
            //this.monster_heal = this.monster_heal - point;
            this.monster_heal-=point;
            this.add_to_log({turn : "P", text : this.log_text.atak + point})
            this.monster_attack()
            
        },
        ozel_atak : function(){
            var point = Math.ceil( Math.random() * this.o_atal_c);
            //this.monster_heal = this.monster_heal - point;
            this.monster_heal-=point;
            this.add_to_log({turn : "P", text : this.log_text.o_atak + point})
            this.monster_attack()
            

        },
        heal_up : function(){
            var point = Math.ceil( Math.random() * this.heal_up_c);
            //this.monster_heal = this.monster_heal - point;
            this.player_heal+=point;
            this.add_to_log({turn : "H", text : this.log_text.heal_up + point})
            this.monster_attack()
            

        },
        give_up : function(){
            this.player_heal = 0;
            this.add_to_log({turn : "P", text : this.log_text.give_up})
            

        },
        monster_attack : function(){
            var point = Math.ceil(Math.random()*this.monster_atak_c)
            this.player_heal-=point;
            this.add_to_log({turn : "M", text : this.log_text.monster_atak + point})
            
        },
        add_to_log : function(log){
            this.logs.push(log);
        }

    },
    watch : {
        player_heal : function(value){
            if(value <= 0){
                this.player_heal = 0;
                if(confirm("OYUNU KAYBETTİN TEKRAR DENEMEK İSTER MİSİN?")){
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs = [];
                }
            } else if(value >= 100){
                this.player_heal = 100;
            }            
        },
        monster_heal : function(value){
            if(value <= 0){
                this.monster_heal = 0;
                if(confirm("OYUNU KAZANDIN TEKRAR DENEMEK İSTER MİSİN?")){
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs = [];
                }
            } 
        }
    },
    computed : {
        player_progress : function(){
            return {
                width : this.player_heal + "%"
            }
        },
        monster_progress : function(){
            return {
                width : this.player_heal + "%"
            }
        },
    }

})
