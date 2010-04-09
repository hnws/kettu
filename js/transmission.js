var transmission = $.sammy(function() { with(this) {
  element_selector = 'body';
  cache_partials = true;
  use(Sammy.TransmissionRPC);
  use(Sammy.Mustache);
  use(Sammy.Cache);
  
  // NOTE: this is not so nice, find another way to initialize store
  store = new Sammy.Store({name: 'data', type: 'local'});
  if(!store.isAvailable()) {
    store = new Sammy.Store({name: 'data', type: 'cookie'});
  }
  
  helpers(ApplicationHelpers);
  helpers(ContextMenuHelpers);
  helpers(FilterTorrentsHelpers);
  helpers(InfoHelpers);
  helpers(LinkHelpers);
  helpers(SearchHelpers);
  helpers(SettingHelpers);
  helpers(SortTorrentsHelpers);
  helpers(StatisticHelpers);
  helpers(StoreHelpers);
  helpers(TorrentHelpers);
  helpers(ViewHelpers);
  
  Torrents(this);
  Settings(this);
  Statistics(this);
  
  bind('flash', function(e, message) { with(this) {
    this.showAndHideFlash(message);
  }});
  
  bind('errors', function(e, errors) { with(this) {
    this.showErrors(errors);
  }});
  
  bind('init', function() { with(this) {
    this.activateLinks();
    this.activateSearch(this);
    this.activateSortSelect(this);
    this.activateContextMenu();
    this.configureFacebox();
    this.closeInfo();
  }});
}});
 
$(function() {
  transmission.run('#/torrents');
  transmission.trigger('init');
});