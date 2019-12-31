var content = new Vue({
  el:'#content',
  data:{
    data : fiction_data,
    current_chapter : 0,
    novels:[],
    novels_show:true,
    menu_show:false,
  },
  mounted(){
    this.current_chapter = this.checkChapter()
    this.findChapter(this.current_chapter)
    window.addEventListener('scroll', this.checkScroll);
  },
  methods:{
    checkChapter(){
      if(localStorage['current_chapter'] !== 'undefined' ){
        var check_chapter = localStorage['current_chapter']
      }else{
        var check_chapter = '1'
      }
      return parseInt(check_chapter)
    },
    findChapter(chapter){
      for(let i = 0;i < this.data.length; i++){
        if(chapter == this.data[i].chapter){
          contents = {
            'content':this.data[i].content,
            'name':this.data[i].name
          }
          this.novels = [contents]
        }
      }
    },
    checkScroll(){
      current_h = window.pageYOffset
      window_h = window.innerHeight
      body_h = document.body.offsetHeight
      if(current_h + window_h >= body_h){
        this.current_chapter += 1
        localStorage['current_chapter'] = parseInt(this.current_chapter)
        this.addChapter()
      }

    },
    addChapter(){
      for(let i = 0;i < this.data.length; i++){
        if(this.current_chapter == this.data[i].chapter){
          contents = {
            'content':this.data[i].content,
            'name':this.data[i].name
          }
          this.novels.push(contents)
        }
      }
    },
    clickNext(){
      this.current_chapter += 1
      localStorage['current_chapter'] = parseInt(this.current_chapter)
      window.scrollTo(0, document.body.scrollTop)
      this.findChapter(this.current_chapter)
    },
    clickPrev(){
      this.current_chapter -= 1
      localStorage['current_chapter'] = parseInt(this.current_chapter)
      window.scrollTo(0, document.body.scrollTop)
      this.findChapter(this.current_chapter)
    },
    clickMenu(){
      this.novels_show = !this.novels_show
      this.menu_show = !this.menu_show
    },
    clearLocalStorage(){
      localStorage['current_chapter'] = "undefined"
      location.reload()
    },
    linkToChapter(chapter){
      this.novels_show = true
      this.menu_show = false
      localStorage['current_chapter'] = parseInt(chapter)
      this.current_chapter = parseInt(chapter)
      this.findChapter(chapter)
    },
  }
})
