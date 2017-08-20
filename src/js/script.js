var portfolio = [
	{
		coin: 'bitcoin',
		coins: 1,
		cost_basis: 500
	},
	{
		coin: 'bitcoin-cash',
		coins: 1,
		cost_basis: 500
	},
	{
		coin: 'ethereum',
		coins: 1,
		cost_basis: 100
	},
	{
		coin: 'litecoin',
		coins: 1,
		cost_basis: 30
	},
];

jQuery( document ).ready( function() {
	
	
	var runPortfolio = function() {
		jQuery( 'body' ).empty();
		
		var i = fetch_count = fetch_total = cost_total = 0;
	
		jQuery( 'body' ).append( '<div id="header"><span>Cryptocurrency</span><span>Price Paid</span><span>Market Price</span><span>Gain/Loss</span></div>' );
	
		var write_dom = function( crypto ) {
			var price_paid = (crypto.cost_basis/crypto.coins);
			if( jQuery( '#' + crypto.coin ).length == 0 ) {
				jQuery( 'body' ).append( '<div id="'+crypto.coin+'"><span class="name">'+crypto.coin+'</span><span class="cost">$'+price_paid.toFixed(2)+'</span><span class="value">-</span><span class="delta">-</span></div>' );
			}
			
			cost_total += crypto.cost_basis;
			jQuery.ajax({
				url: 'https://api.coinmarketcap.com/v1/ticker/'+crypto.coin+'/',
				cache: false,
				success: function( results ) {
					results = results[0];
					jQuery('#'+crypto.coin).find('span.value').html('$' + parseFloat(results.price_usd).toFixed(2) );
					jQuery('#'+crypto.coin).find('span.delta').html((((parseFloat(results.price_usd) - price_paid) / price_paid) * 100).toFixed(2) + '%' );
					//console.log(parseFloat(results.price_usd) , price_paid );
					fetch_total += ( crypto.coins * parseFloat(results.price_usd) );
					
					//console.log( results );
					if( fetch_count++ == portfolio.length - 1 ) {
						jQuery('#summary').find('span.value').html('$' + fetch_total.toFixed(2) );
						jQuery('#summary').find('span.delta').html( (((fetch_total - cost_total) / cost_total)*100).toFixed(2) + '%' );
					}
				}
			});
		};
		
		
		for( i = 0; i < portfolio.length; i += 1 ) {
			write_dom( portfolio[ i ] );
		}
		
		jQuery( 'body' ).append( '<div id="summary"><span class="name">&nbsp;</span><span class="cost">$'+cost_total+'</span><span class="value">-</span><span class="delta">-</span></div>' );
		jQuery( 'body' ).append( '<div id="timestamp"><span class="name">'+(function() { return Date(); }() )+'</span>' );
		jQuery( 'body' ).append( jQuery( '<div class="link_refresh">Refresh</div>' ).click( function(){ runPortfolio(); } ) );
	};
	
	//window.setInterval( runPortfolio, 60000 );
	
	runPortfolio();
} );