import React, { Component } from "react";
import { Document, Page } from 'react-pdf';
import 'antd/lib/pagination/style/css'
import p from './assets/build/generic/web/1.pdf'
import p1 from './assets/build/generic/web/2.pdf'
import p2 from './assets/build/generic/web/3.pdf'
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default class App extends Component {
  state = {
    page: 1,
    totalPage: 0,
    scalcnum: 1,
    fill_flag_c: false,
    filesrc: p,
    input_c_val: "",
    currentpage: 0,
    clickflag: false,
    scrol_flag: true

  }
  onDocumentLoadSuccess = (e) => {

    this.setState({
      totalPage: e.numPages - 1
    })
  };
  handelOnChange_c = (pages) => {
    this.setState({
      page: pages
    })
  };
  scalc_c = (e, val) => {
    if (e === 1) {
      this.setState({
        scalcnum: val + 0.2
      })
    } else if (e === 2 && this.state.scalcnum > 1) {

      this.setState({
        scalcnum: val - 0.2
      })
    }
  }
  toFullVideo = (e) => {
    if (e.requestFullscreen) {
      return e.requestFullscreen();
    } else if (e.webkitRequestFullScreen) {
      return e.webkitRequestFullScreen();
    } else if (e.mozRequestFullScreen) {
      return e.mozRequestFullScreen();
    } else {
      return e.msRequestFullscreen();
    }
  }
  scrll_fill_c = () => {
    let el = this.$('center_c')
    this.toFullVideo(el)
  }
  click_left_item = (i) => {
    // this.$('center_c').removeEventListener('scroll', this.cc);

    this.setState({
      scrol_flag: false
    }, () => {
      this.setState({
        currentpage: i
      })
    })

    this.scrollIntoView_c(i)
    // this.$('center_c').addEventListener('scroll', this.cc);
    this.setState({ scrol_flag: true })

  }
  enter_c = (e) => {
    const { totalPage } = this.state
    if (e.keyCode === 13 && e.target.value - 1 >= 0 && e.target.value <= totalPage) {
      this.setState({
        input_c_val: "",
        currentpage: e.target.value - 1
      })
      this.scrollIntoView_c(e.target.value - 1)
    } else if (e.keyCode === 13) {
      alert('你是不是傻')
    }
  }
  input_val_change = (e) => {
    this.setState({
      input_c_val: e.target.value.replace(/\D/g, '')
    })
  }
  prevclick_c = () => {
    this.$('center_c').removeEventListener('scroll', this.cc);
    const { totalPage } = this.state
    const ol_c_node = this.$('.ol_c');
    const index = [...ol_c_node.children].findIndex((v, i) => {
      return v.className === 'left_c_item_active'
    })

    if (index - 1 < 0) {
      this.scrollIntoView_c(totalPage - 1)
      this.setState({
        currentpage: totalPage - 1
      })
    } else {

      this.scrollIntoView_c(index - 1)

      this.setState({
        currentpage: index - 1
      })
    }

    setTimeout(() => {
      this.$('center_c').addEventListener('scroll', this.cc);
    })
  }
  nextclick_c = () => {

    this.$('center_c').removeEventListener('scroll', this.cc);
    const ol_c_node = this.$('.ol_c');
    const Document_wrap_cel = this.$('.Document_wrap_c')
    const index = [...ol_c_node.children].findIndex((v, i) => {
      return v.className === 'left_c_item_active'
    })

    if (Array.from(Document_wrap_cel.children)[index + 1]) {
      this.scrollIntoView_c(index + 1)
      this.setState({
        currentpage: index + 1
      })
    } else {
      this.scrollIntoView_c(0)
      this.setState({
        currentpage: 0
      })
    }

    setTimeout(() => {

      this.$('center_c').addEventListener('scroll', this.cc);
    })
  }
  scrollIntoView_c(i) {
    const Document_wrap_cel = this.$('.Document_wrap_c')
    // Array.from(Document_wrap_cel.children)[i].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    Array.from(Document_wrap_cel.children)[i].scrollIntoView();

  }
  cc = (e) => {
    if (!this.state.scrol_flag) {
      return
    }
    let all_height_c = this.$('.center_c').scrollTop
    let aser = this.cavas_node_height_arr().map((v, i) => {
      return this.cavas_node_height_arr()[i] - 10 <= all_height_c
    }).filter((v => v))
    console.log(aser)
    if (aser.length < 0) {
      this.setState({
        currentpage: 0
      })
    }
    else {
      this.setState({
        currentpage: aser.length
      })
    }

  }
  content_scroll_c = (el) => {

    el.addEventListener('scroll', this.cc)
  }
  cavas_node_height_arr = () => {
    let offsetHeight_arr_c = [...document.querySelectorAll('.react-pdf__Page')].map((v) => {
      if (v) {
        return v.offsetHeight
      } else {
        return []
      }
    })

    let pase_arr = []
    for (let i = 1; i < offsetHeight_arr_c.length; i++) {
      let h = offsetHeight_arr_c[i]
      for (let k = 0; k < i; k++) {
        h = h + offsetHeight_arr_c[k]
      }
      pase_arr.push(h)
    }
    pase_arr.unshift(offsetHeight_arr_c[0])
    return pase_arr
  }
  componentDidMount() {
    this.content_scroll_c(this.$('center_c'))
  }

  $ = (e) => {
    let el = '';
    el = document.getElementById(e)
    if (el) {
      return el
    } else {
      return document.querySelector(e)
    }
  }
  render() {

    const { totalPage, scalcnum, currentpage, filesrc, input_c_val } = this.state
    return (
      
      <div className='wrap_c_big'>

        {/* <Pagination onChange={handelOnChange} total={totalPage * 10} current={page} /> */ }
        <div className='header_c'>
          <span onClick={() => {
            this.prevclick_c()
          }}>上一页</span>
          <span onClick={() => {
            this.nextclick_c()
          }}>下一页</span>
          <span>
            <input className='input_c' value={input_c_val}
              placeholder='输入页码'
              onChange={(e) => {
                this.input_val_change(e)
              }}
              onKeyDown={(e) => {
                this.enter_c(e)
              }} /></span>
          <span onClick={() => {
            this.scrll_fill_c()
          }} >全屏</span>
          <span onClick={() => {
            this.scalc_c(1, scalcnum)
          }}>放大</span>

          <span onClick={() => {
            this.scalc_c(2, scalcnum)
          }} >缩小</span>
        </div>
        <div className='content_wrap_c'  >
          <div className="left_c">
            <ol className='ol_c'>
              {Array.from({ length: totalPage }, (v, k) => k + 1).map((v, i) => {
                return <li className={currentpage === i ? 'left_c_item_active' : ""} onClick={() => this.click_left_item(i)} key={i}>
                  <span>{i + 1}</span>
                  <img src={require('./logo.svg')} alt="" />
                </li>
              })}

            </ol></div>
          <div className={`center_c`} id='center_c'>
            <Document

              className='Document_wrap_c'
              file={filesrc}
              // file='https://d.zjyve.com/down/test/bd23f32efc5149e68d3db315d4d65dcb'
              onLoadSuccess={this.onDocumentLoadSuccess}
              onLoadError={console.error}
              renderMode="canvas"
              loading="正在努力加载中"
              externalLinkTarget="_blank"
              renderTextLayer={true}

            >
              {Array.from({ length: totalPage }, (v, k) => k + 2).map((v, i) => {

                return <Page pageNumber={v - 1} size="A4" scale={scalcnum} key={i} />

              })}
            </Document>
          </div>
          <div className="right_c" >
            <ul className='ul_c'>
              <li onClick={() => {
                this.setState({
                  filesrc: p
                  ,
                  scalcnum: 1
                })
              }}>第一个pdf</li>
              <li onClick={() => {
                this.setState({
                  filesrc: p1,
                  scalcnum: 1
                })
              }}>第儿个pdf</li>
              <li onClick={() => {
                this.setState({
                  filesrc: p2,
                  scalcnum: 1
                })
              }}>第三个pdf</li>

            </ul>
          </div>

        </div>
      </div>
    )
  }
}










