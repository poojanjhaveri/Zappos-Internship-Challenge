// JavaScript Document

(function(){

var source   = $("#entry-template").html();
var template = Handlebars.compile(source);
var itemresults;

window.App={
			Zappos:{	
					initialize:function()
					{
						console.log("Hey");
						this.$searchterm=$('#searchterm');
						this.$submitbutton=$('#submitbutton');
						itemresults = new Array();
						this.bindEventListeners();				
	
					},
					
					bindEventListeners:function()
					{
					var self = this;
					  this.$submitbutton.on('click',function(event){
							event.preventDefault();
						  self.searchProducts(self.$searchterm.val());
					  });
					
					},
					
					searchProducts:function(term)
					{
						console.log(term);
						
						$.ajax({
						url: "http://api.zappos.com/Search?term="+term+"&key=67d92579a32ecef2694b74abfc00e0f26b10d623",
						type:"get",
						dataType:"jsonp",
						success: function(json){
							
							console.log("PRINT");
							App.Display.renderJSON(json);
							this.$itemresults=json;
							
							}
						});
						
						
					},
					
				},
			
			
			
			Display:{
					renderJSON:function(data)
					{
						var $content = $('#content');			// selector caching
						$content.html("");						// Erase the content at beginning of every json Request
						console.log(data);
						if(data.results.length==0)				// Results count is zero. So no data obtained
						{
							$content.html("No Product Found");		// No vaid artist found
							}
						else
						{
							itemresults=data.results;
						  for(var i=0;i<data.results.length;i++)
						  {
							 var htmlWithData = template(data.results[i]);	 // pass the data to the function so that it compiles
							 $content.append(htmlWithData);					// Append the data to existing div
							 
						  }
						}
						
						this.bindEventListeners();
						
						
					},
					
					bindEventListeners:function()
					{
						var self = this;
					  	$('.item .pricealert').on('click',function(event){
							console.log($(this).data('info'));
							for(var i=0;i<itemresults.length;i++)
							{
								if(itemresults[i].styleId==$(this).data('info'))
								{
									ParseApp.Send.saveAlert(itemresults[i]);
								}
								
							}
							
					  });
					  
					  
					  $('.item .changeprice').on('click',function(event){
						  event.preventDefault();
							
							for(var i=0;i<itemresults.length;i++)
							{
								if(itemresults[i].styleId==$(this).data('info'))
								{
									console.log(itemresults[i].originalPrice);
									var newprice = $(this).parent().find( $('.item .newpriceinput')).val();
									$(this).parent().parent().find($('.currentPriceValue')).html("Current price: $"+newprice);
									self.calculatePriceDifference(itemresults[i].originalPrice,newprice,itemresults[i]);
									
								}
								
							}
							
					  });
					  
					  
						
					},
					
					calculatePriceDifference:function(oprice,nprice,product)
					{
						oprice=oprice.replace("$","")
						var pricedifference=(oprice-nprice)*100/oprice;
						console.log(pricedifference);
						if(pricedifference >= 20)
						{
							alert("Price Alert !! 20% off item -"+product.brandName+" "+product.productName+"\n Buy now");
							ParseApp.Check.sendAlert(product);
						}
					}
				
				
				
			}
			
			
			
		}



App.Zappos.initialize();

})();