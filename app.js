const ALL_SONGS = [
  {"title": "O Sol", "artist": "Vitor Kley", "style": "Pop", "cifraClubUrl": "https://www.cifraclub.com.br/vitor-kley/o-sol/"},
  {"title": "Zombie", "artist": "The Cranberries", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/the-cranberries/zombie/"},
  {"title": "Acima do Sol", "artist": "Skank", "style": "Pop Rock", "cifraClubUrl": "https://www.cifraclub.com.br/skank/acima-do-sol/"},
  {"title": "Pescador de Ilusões", "artist": "O Rappa", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/o-rappa/pescador-de-ilusoes/"},
  {"title": "Velha Infância", "artist": "Tribalistas", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/tribalistas/velha-infancia/"},
  {"title": "Anunciação", "artist": "Alceu Valença", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/alceu-valenca/anunciacao/"},
  {"title": "Trem-Bala", "artist": "Ana Vilela", "style": "Pop", "cifraClubUrl": "https://www.cifraclub.com.br/ana-vilela/trem-bala/"},
  {"title": "Torn", "artist": "Natalie Imbruglia", "style": "Pop", "cifraClubUrl": "https://www.cifraclub.com.br/natalie-imbruglia/torn/"},
  {"title": "Good Riddance (Time Of Your Life)", "artist": "Green Day", "style": "Punk Rock", "cifraClubUrl": "https://www.cifraclub.com.br/green-day/good-riddance-time-of-your-life/"},
  {"title": "O' Children", "artist": "Nick Cave", "style": "Alternative", "cifraClubUrl": "https://www.cifraclub.com.br/nick-cave/o-children/"},
  {"title": "Bixinho", "artist": "DUDA BEAT", "style": "Pop", "cifraClubUrl": "https://www.cifraclub.com.br/duda-beat/bixinho/"},
  {"title": "Como Eu Quero", "artist": "Kid Abelha", "style": "Pop Rock", "cifraClubUrl": "https://www.cifraclub.com.br/kid-abelha/como-eu-quero/"},
  {"title": "Wonderwall", "artist": "Oasis", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/oasis/wonderwall/", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/oasis/wonderwall-chords-27596"},
  {"title": "Save Tonight", "artist": "Eagle-Eye Cherry", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/eagle-eye-cherry/save-tonight/"},
  {"title": "Linger", "artist": "The Cranberries", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/the-cranberries/linger/"},
  {"title": "Last Kiss", "artist": "Pearl Jam", "style": "Grunge", "cifraClubUrl": "https://www.cifraclub.com.br/pearl-jam/last-kiss/"},
  {"title": "Me Namora", "artist": "Natiruts", "style": "Reggae", "cifraClubUrl": "https://www.cifraclub.com.br/natiruts/me-namora/"},
  {"title": "Lenha", "artist": "Zeca Baleiro", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/zeca-baleiro/lenha/"},
  {"title": "Já Sei Namorar", "artist": "Tribalistas", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/tribalistas/ja-sei-namorar/"},
  {"title": "Pra Dizer Adeus", "artist": "Titãs", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/titas/pra-dizer-adeus/"},
  {"title": "Exagerado", "artist": "Cazuza", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/cazuza/exagerado/"},
  {"title": "Partilhar", "artist": "Rubel", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/rubel/partilhar/"},
  {"title": "Kiss From a Rose", "artist": "Seal", "style": "Pop", "cifraClubUrl": "https://www.cifraclub.com.br/seal/kiss-from-a-rose/", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/seal/kiss-from-a-rose-chords-2326523"},
  {"title": "O Passageiro", "artist": "Capital Inicial", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/capital-inicial/o-passageiro/"},
  {"title": "Somewhere Over The Rainbow", "artist": "Israel Kamakawiwo'ole", "style": "Folk", "cifraClubUrl": "https://www.cifraclub.com.br/israel-kamakawiwoole/somewhere-over-the-rainbow/"},
  {"title": "Always Remember Us This Way", "artist": "Lady Gaga", "style": "Pop", "cifraClubUrl": "https://www.cifraclub.com.br/lady-gaga/always-remember-us-this-way/", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/misc-soundtrack/a-star-is-born-always-remember-us-this-way-official-2487525"},
  {"title": "Stand By Me", "artist": "The Beatles", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/the-beatles/stand-by-me/"},
  {"title": "Quarter Past Four", "artist": "Avriel & The Sequoias", "style": "Folk", "cifraClubUrl": "https://www.cifraclub.com.br/avriel-the-sequoias/quarter-past-four/", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/avriel-the-sequoias/quarter-past-four-chords-2015021"},
  {"title": "Barely Breathing", "artist": "Duncan Sheik", "style": "Pop", "cifraClubUrl": "https://www.cifraclub.com.br/duncan-sheik/barely-breathing/"},
  {"title": "Simple Song", "artist": "Passenger", "style": "Folk", "cifraClubUrl": "https://www.cifraclub.com.br/passenger/simple-song/"},
  {"title": "Pintinho Amarelinho", "artist": "Galinha Pintadinha", "style": "Children", "cifraClubUrl": "https://www.cifraclub.com.br/galinha-pintadinha/pintinho-amarelinho/"},
  {"title": "Só Os Loucos Sabem", "artist": "Charlie Brown Jr.", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/charlie-brown-jr/so-os-loucos-sabem/"},
  {"title": "Minha Felicidade", "artist": "Roberta Campos", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/roberta-campos/minha-felicidade/"},
  {"title": "Telegrama", "artist": "Zeca Baleiro", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/zeca-baleiro/telegrama/"},
  {"title": "Tive Razão", "artist": "Seu Jorge", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/seu-jorge/tive-razao/"},
  {"title": "Tribo da Lua", "artist": "Dazaranha", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/dazaranha/tribo-da-lua/"},
  {"title": "Vapor Barato", "artist": "O Rappa", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/o-rappa/vapor-barato/"},
  {"title": "Rodo Cotidiano", "artist": "O Rappa", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/o-rappa/rodo-cotidiano/"},
  {"title": "Lágrimas e Chuva", "artist": "Kid Abelha", "style": "Pop Rock", "cifraClubUrl": "https://www.cifraclub.com.br/kid-abelha/lagrimas-e-chuva/"},
  {"title": "Até o Fim", "artist": "Engenheiros do Hawaii", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/engenheiros-do-hawaii/ate-o-fim/"},
  {"title": "Garotos II - O Outro Lado", "artist": "Leoni", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/leoni/garotos-ii-o-outro-lado/"},
  {"title": "What a Wonderful World", "artist": "Israel Kamakawiwo'ole", "style": "Folk", "cifraClubUrl": "https://www.cifraclub.com.br/israel-kamakawiwoole/what-a-wonderful-world/"},
  {"title": "Proibida Pra Mim", "artist": "Zeca Baleiro", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/zeca-baleiro/proibida-pra-mim/"},
  {"title": "Burguesinha", "artist": "Seu Jorge", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/seu-jorge/burguesinha/"},
  {"title": "Deixe-me Ir", "artist": "1Kilo", "style": "Pop", "cifraClubUrl": "https://www.cifraclub.com.br/1kilo/deixe-me-ir/"},
  {"title": "Malandragem", "artist": "Cássia Eller", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/cassia-eller/malandragem/"},
  {"title": "Várias Queixas", "artist": "Gilsons", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/gilsons/varias-queixas/"},
  {"title": "Vagabundo Confesso", "artist": "Dazaranha", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/dazaranha/vagabundo-confesso/"},
  {"title": "A Noite", "artist": "Tiê", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/tie/a-noite/"},
  {"title": "Medo Bobo", "artist": "Maiara & Maraisa", "style": "Sertanejo", "cifraClubUrl": "https://www.cifraclub.com.br/maiara-e-maraisa/medo-bobo/"},
  {"title": "Você", "artist": "Tim Maia", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/tim-maia/voce/"},
  {"title": "Quero Ser Feliz Também", "artist": "Natiruts", "style": "Reggae", "cifraClubUrl": "https://www.cifraclub.com.br/natiruts/quero-ser-feliz-tambem/"},
  {"title": "Sorri, Sou Rei", "artist": "Natiruts", "style": "Reggae", "cifraClubUrl": "https://www.cifraclub.com.br/natiruts/sorri-sou-rei/"},
  {"title": "Devagarinho", "artist": "Gilsons", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/gilsons/devagarinho/"},
  {"title": "Tudo Vai Dar Certo", "artist": "Natiruts", "style": "Reggae", "cifraClubUrl": "https://www.cifraclub.com.br/natiruts/tudo-vai-dar-certo/"},
  {"title": "Azul da Cor do Mar", "artist": "Tim Maia", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/tim-maia/azul-da-cor-do-mar/"},
  {"title": "Mais Uma Vez", "artist": "Jota Quest", "style": "Pop Rock", "cifraClubUrl": "https://www.cifraclub.com.br/jota-quest/mais-uma-vez/"},
  {"title": "Ai Que Saudade D'ocê", "artist": "Alceu Valença", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/alceu-valenca/ai-que-saudade-doce/"},
  {"title": "Love Love", "artist": "Gilsons", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/gilsons/love-love/"},
  {"title": "Boa Sorte / Good Luck", "artist": "Vanessa da Mata", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/vanessa-da-mata/boa-sorte-good-luck/"},
  {"title": "Tempo Perdido", "artist": "Legião Urbana", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/legiao-urbana/tempo-perdido/"},
  {"title": "Alecrim", "artist": "Músicas Infantis", "style": "Children", "cifraClubUrl": "https://www.cifraclub.com.br/musicas-infantis/alecrim/"},
  {"title": "Someone Like You", "artist": "Adele", "style": "Pop", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/adele/someone-like-you-chords-1006751"},
  {"title": "Je Veux", "artist": "Zaz", "style": "Pop", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/zaz/je-veux-chords-980879"},
  {"title": "Hey Ya", "artist": "Avriel & The Sequoias", "style": "Folk", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/avriel-the-sequoias/hey-ya-chords-2193627"},
  {"title": "Hotel California", "artist": "Eagles", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/eagles/hotel-california-chords-46190"},
  {"title": "Can't Help Falling In Love", "artist": "UB40", "style": "Reggae", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/ub40/i-cant-help-falling-in-love-with-you-chords-680409"},
  {"title": "I See Fire", "artist": "Ed Sheeran", "style": "Pop", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/ed-sheeran/i-see-fire-official-2402581"},
  {"title": "When I Come Around", "artist": "Green Day", "style": "Punk Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/green-day/when-i-come-around-official-1942927"},
  {"title": "Shallow", "artist": "Lady Gaga", "style": "Pop", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/misc-soundtrack/a-star-is-born-shallow-official-2481693"},
  {"title": "Have You Ever Seen The Rain", "artist": "Creedence Clearwater Revival", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/creedence-clearwater-revival/have-you-ever-seen-the-rain-official-1946361"},
  {"title": "Imagine", "artist": "John Lennon", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/john-lennon/imagine-official-2087387"},
  {"title": "What's Up", "artist": "4 Non Blondes", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/4-non-blondes/whats-up-official-1996859"},
  {"title": "Counting Stars", "artist": "OneRepublic", "style": "Pop Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/onerepublic/counting-stars-official-1976877"},
  {"title": "Cotton Eye Joe", "artist": "The Sweeplings", "style": "Folk", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/the-sweeplings/cotton-eye-joe-chords-4432685"},
  {"title": "Stairway To Heaven", "artist": "Led Zeppelin", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/led-zeppelin/stairway-to-heaven-official-1911433"},
  {"title": "Society", "artist": "Eddie Vedder", "style": "Folk", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/eddie-vedder/society-official-1948063"},
  {"title": "Dust In The Wind", "artist": "Kansas", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/kansas/dust-in-the-wind-official-1948091"},
  {"title": "Wild World", "artist": "Cat Stevens (Yusuf Islam)", "style": "Folk", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/cat-stevens-yusuf-islam/wild-world-official-1951405"},
  {"title": "Wanted Dead Or Alive", "artist": "Bon Jovi", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/bon-jovi/wanted-dead-or-alive-official-1954021"},
  {"title": "Right Here Waiting", "artist": "Richard Marx", "style": "Pop", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/richard-marx/right-here-waiting-official-2646576"},
  {"title": "Dance Monkey", "artist": "Tones And I", "style": "Pop", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/tones-and-i/dance-monkey-official-2892965"},
  {"title": "Here Comes The Sun", "artist": "The Beatles", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/the-beatles/here-comes-the-sun-official-1990437"},
  {"title": "Don't Let Me Down", "artist": "The Beatles", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/the-beatles/dont-let-me-down-official-1962071"},
  {"title": "Sitting Waiting Wishing", "artist": "Jack Johnson", "style": "Folk", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/jack-johnson/sitting-waiting-wishing-official-2197849"},
  {"title": "Upside Down", "artist": "Jack Johnson", "style": "Folk", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/jack-johnson/upside-down-official-2199567"},
  {"title": "Creep", "artist": "Radiohead", "style": "Alternative Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/radiohead/creep-chords-4169"},
  {"title": "De Ushuaia A La Quiaca", "artist": "Gustavo Santaolalla", "style": "Instrumental", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/gustavo-santaolalla/de-ushuaia-a-la-quiaca-guitar-pro-1045900"},
  {"title": "Alive", "artist": "Pearl Jam", "style": "Grunge", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/pearl-jam/alive-official-2099711"},
  {"title": "Intro", "artist": "The xx", "style": "Alternative", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/the-xx/intro-official-1961281"},
  {"title": "Best Of You", "artist": "Foo Fighters", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/foo-fighters/best-of-you-official-1944037"},
  {"title": "The Unforgiven", "artist": "Metallica", "style": "Metal", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/metallica/the-unforgiven-official-1936157"},
  {"title": "Everything You Want", "artist": "Vertical Horizon", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/vertical-horizon/everything-you-want-official-3416513"},
  {"title": "Sultans Of Swing", "artist": "Dire Straits", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/dire-straits/sultans-of-swing-official-1911505"},
  {"title": "Wish You Were Here", "artist": "Pink Floyd", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/pink-floyd/wish-you-were-here-official-2412207"},
  {"title": "Black", "artist": "Pearl Jam", "style": "Grunge", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/pearl-jam/black-official-2451097"},
  {"title": "Nothing Else Matters", "artist": "Metallica", "style": "Metal", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/metallica/nothing-else-matters-official-1910953"},
  {"title": "Good Riddance (Time Of Your Life)", "artist": "Green Day", "style": "Punk Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/green-day/good-riddance-time-of-your-life-official-1910849"}
];

class SongApp {
  constructor() {
    this.songs = ALL_SONGS;
    this.filteredSongs = [...this.songs];
    
    this.searchInput = document.getElementById('searchInput');
    this.styleFilter = document.getElementById('styleFilter');
    this.artistFilter = document.getElementById('artistFilter');
    this.sourceFilter = document.getElementById('sourceFilter');
    this.songsTableBody = document.getElementById('songsTableBody');
    this.emptyState = document.getElementById('emptyState');
    this.resultText = document.getElementById('resultText');
    
    this.init();
  }
  
  init() {
    this.populateFilters();
    this.render();
    this.setupEventListeners();
  }
  
  populateFilters() {
    const styles = [...new Set(this.songs.map(s => s.style))].sort();
    const artists = [...new Set(this.songs.map(s => s.artist))].sort();
    
    styles.forEach(style => {
      const option = document.createElement('option');
      option.value = style;
      option.textContent = style;
      this.styleFilter.appendChild(option);
    });
    
    artists.forEach(artist => {
      const option = document.createElement('option');
      option.value = artist;
      option.textContent = artist;
      this.artistFilter.appendChild(option);
    });
  }
  
  setupEventListeners() {
    this.searchInput.addEventListener('input', () => this.filter());
    this.styleFilter.addEventListener('change', () => this.filter());
    this.artistFilter.addEventListener('change', () => this.filter());
    this.sourceFilter.addEventListener('change', () => this.filter());
  }
  
  filter() {
    const search = this.searchInput.value.toLowerCase();
    const style = this.styleFilter.value;
    const artist = this.artistFilter.value;
    const source = this.sourceFilter.value;
    
    this.filteredSongs = this.songs.filter(song => {
      if (search && !song.title.toLowerCase().includes(search) && 
          !song.artist.toLowerCase().includes(search) &&
          !song.style.toLowerCase().includes(search)) {
        return false;
      }
      if (style && song.style !== style) return false;
      if (artist && song.artist !== artist) return false;
      if (source) {
        if (source === 'cifraclub' && !song.cifraClubUrl) return false;
        if (source === 'ultimate-guitar' && !song.ultimateGuitarUrl) return false;
      }
      return true;
    });
    
    this.render();
  }
  
  render() {
    this.resultText.textContent = `${this.filteredSongs.length} songs`;
    
    if (this.filteredSongs.length === 0) {
      this.songsTableBody.innerHTML = '';
      this.emptyState.hidden = false;
      return;
    }
    
    this.emptyState.hidden = true;
    
    this.songsTableBody.innerHTML = this.filteredSongs.map(song => {
      const links = [];
      if (song.cifraClubUrl) {
        links.push(`<a href="${song.cifraClubUrl}" target="_blank" class="link-cc">Cifra Club</a>`);
      }
      if (song.ultimateGuitarUrl) {
        links.push(`<a href="${song.ultimateGuitarUrl}" target="_blank" class="link-ug">UG</a>`);
      }
      
      return `
        <tr>
          <td>${this.escapeHtml(song.title)}</td>
          <td>${this.escapeHtml(song.artist)}</td>
          <td><span class="style-tag">${this.escapeHtml(song.style)}</span></td>
          <td class="links-cell">${links.join(' ')}</td>
        </tr>
      `;
    }).join('');
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SongApp();
});