import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image, Text} from '@tarojs/components'
import {AtSearchBar, AtNoticebar} from 'taro-ui'
import {connect} from '@tarojs/redux';
import './index.less';

@connect(({home}) => ({...home}))
class Index extends Component {

  config = {
    navigationBarTitleText: "安安实验",
    backgroundColor: "#f0f0f0",
    backgroundTextStyle: "light"
  };

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/getMenuList',
    });
  };

  onPullDownRefresh() {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/getMenuList',
    });
  }

  render() {
    const {menuList} = this.props;

    const menuitem = menuList.map((item, index) => {
      return <View
        className='menu-item'
        key={String(index)}
      >
        <Image src={item.logo}></Image>
        <Text>{item.name}</Text>
      </View>
    });

    return (
      <View>
        <AtSearchBar
          actionName='搜索'
          onActionClick={this.onActionClick.bind(this)}
        />
        <View style={{paddingTop: '10px'}}>
          <Swiper
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay>
            <SwiperItem>
              <View className='img-wrap'>
                <Image src='https://static.ananlab.com/wx/banner.png'/>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className='img-wrap'>
                <Image src='https://static.ananlab.com/wx/banner.png'/>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className='img-wrap'>
                <Image src='https://static.ananlab.com/wx/banner.png'/>
              </View>
            </SwiperItem>
          </Swiper>
        </View>

        <AtNoticebar marquee>
          这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
        </AtNoticebar>

        <View className='menu-nav' style={{paddingTop: '10px'}}>{menuitem}</View>
      </View>
    )
  }
}

export default Index
