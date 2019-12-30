var content = new Vue({
  el:'#content',
  data:{
    data : fiction_data,
    current_chapter : 0,
    content:'',
    name:'',
  },
  mounted(){
    this.current_chapter = this.checkChapter()
    this.findChapter(this.current_chapter)
  },
  methods:{
    checkChapter(){
      if(localStorage['current_chapter'] !== 'undefined' ){
        var check_chapter = localStorage['current_chapter']
      }else{
        var check_chapter = '251'
      }
      console.log(check_chapter)
      return parseInt(check_chapter)
    },
    findChapter(chapter){
      for(let i = 0;i < this.data.length; i++)
        if(chapter == this.data[i].chapter){
          this.content = this.data[i].content        
          this.name = this.data[i].name
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

    },
    clearLocalStorage(){
      localStorage['current_chapter'] = "undefined"
      location.reload()
    }
  }
})


// $(window).scroll(function() {
//     console.log('check')
//    if($(window).scrollTop() + $(window).height() == $(document).height()) {
//        document.getElementById('content').append("123")
//    }
// });


// console.log('window.scrolltop: '+$(window).scrollTop())
// console.log('window.height: '+$(window).height())
// console.log('document.height: '+$(document).height())
// console.log('-------------------------')
// console.log('window.pageYOffset: '+window.pageYOffset)
// console.log('window.innerHeight: '+window.innerHeight)
// console.log('body.offsetHeight: '+document.body.offsetHeight)

