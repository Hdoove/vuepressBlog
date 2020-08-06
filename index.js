const pro = new Promise((resolve, reject) => {
    
    const innerpro = new Promise((resolve, reject) => {
        
      setTimeout(() => { 
        resolve(1); 
      }, 0); 
      
      console.log(2); 
      resolve(3); 
      
    }); 
  
    innerpro.then(res => console.log(res));
  
    resolve(4); 
  
    console.log("pro"); 
  });
  
  pro.then(res => console.log(res)); 
  
  console.log("end");