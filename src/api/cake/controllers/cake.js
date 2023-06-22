'use strict';

/**
 * cake controller
 */

const { createCoreController } = require('@strapi/strapi').factories;



module.exports = createCoreController('api::cake.cake', ({strapi}) =>({
   
    
    async customAction(){
        const ctx = strapi.requestContext.get();
        const {size,topping,order,direction,name} = ctx.request.query
        let entity;  
         
        try {
            if (size === "tamaño" && topping === "topping"){
                entity = await strapi.db.query('api::cake.cake').findMany({})}
             if(size !== "tamaño" && topping === "topping" ){
              entity = await strapi.db.query('api::cake.cake').findMany({ where : {size : size}})}
             if(size ==="tamaño" && topping !== "topping" ) 
             entity = await strapi.db.query('api::cake.cake').findMany({ where : {toppingType : topping}})
             if(size !== "tamaño" && topping !== "topping"){
               entity = await strapi.db.query('api::cake.cake').findMany({ where : {$and :[{size : size}, {toppingType : topping} ]}})
             } 
        } catch (error) {
              return ctx.body = error 
        }
        
       try { if (direction == "des" ){
        entity.sort(function (a, b) {
        if (parseFloat(a[order]) > parseFloat(b[order])) {
            console.log(parseFloat(b[order]))
            return -1;
        }
        if (parseFloat(a[order]) < parseFloat(b[order])) {
          return 1;
        }
        return 0;
      });}

      if (direction == "asc"){
        entity.sort(function (a, b) {
            if (parseFloat(a[order]) > parseFloat(b[order])) {
              return 1;
            }
            if (parseFloat(a[order]) < parseFloat(b[order])) {
              return -1;
            }
            return 0;
          });
      } 
        
       } catch (error) {
        return ctx.body = error 
       }
        try {
            let json = entity.filter((cake)=> cake.name.toLowerCase().includes(name.toLowerCase()))
            ctx.body = json;
        } catch (error) {
            return ctx.body = error
        }   
         
       
    
         
    }}))