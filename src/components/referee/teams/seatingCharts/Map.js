import React, {Component} from 'react';

import SeatingChartStyle from './SeatingChartStyle';
import MapStyle from './MapStyle';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedStatus: "sectionSelection"
    };
    this.returnArea = this.returnArea.bind(this);
    this.sectionHighlighted = this.sectionHighlighted.bind(this);
  }

  sectionHighlighted(event){
    this.props.highlight(event.target.title);
  }

  returnArea(section){
    return(
      <a href="#101">
        <polygon style={MapStyle.unselected} points="966.91 1167.293 1070.213 1167.293 1070.7 1309.578 966.91 1309.091"/>
      </a>
    );
  }

  render(){
    return (
      <div>
        <svg version="1.1" id="svg3699" width="100%" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
          <a href="#101">
            <polygon onClick={this.props.onMouseClick} style={MapStyle.unselected} points="966.91 1167.293 1070.213 1167.293 1070.7 1309.578 966.91 1309.091"/>
          </a>
          <a href="#102">
            <polygon style={MapStyle.selected} points="829.01 1167.78 966.91 1167.293 966.91 1308.604 945.47 1308.604 945.47 1328.095 829.01 1327.12"/>
          </a>
          <a href="#103">
            <polygon style={MapStyle.unselected} points="765.048 1168.295 829.181 1167.805 829.018 1327.404 793.769 1324.793 760.315 1319.245 739.917 1314.186 740.08 1302.599 728.004 1300.315"/>
          </a>
          <a href="#104">
            <polygon style={MapStyle.unselected} points="723.591 1168.029 765.621 1168.509 730.796 1288.833 687.806 1266.738 671.955 1257.611 656.584 1246.083 639.292 1232.153 660.187 1201.652 695.732 1214.621"/>
          </a>
          <a href="#105">
            <polygon style={MapStyle.unselected} points="609.992 1150.977"/>
          </a>
          <a href="#106">
            <polygon style={MapStyle.unselected} points="680.361 1074.123 693.81 1148.335 621.76 1260.253 601.346 1242.481 584.294 1225.188 572.526 1210.538 565.801 1200.451 573.727 1191.805 570.844 1185.08"/>
          </a>
          <a href="#107">
            <polygon style={MapStyle.unselected} points="515.126 983.099 676.038 983.339 676.038 1020.085 678.2 1050.586 680.361 1073.162 570.844 1184.36 556.915 1166.828 548.509 1171.871 535.3 1147.614 526.894 1127.2 518.248 1102.223 530.496 1097.9 520.169 1053.228 516.086 1026.81 515.126 1004.714"/>
          </a>
          <a href="#108">
            <polygon style={MapStyle.unselected} points="576.069 781.638 680.482 889.005 677.876 918.713 676.486 943.731 675.444 982.994 515.436 982.821 514.915 970.486 519.78 926.705 525.165 892.132 532.81 859.644 547.751 826.288 560.086 804.919"/>
          </a>
          <a href="#109">
            <polygon style={MapStyle.unselected} points="562.706 766.063 585.186 741.038 604.273 721.103 625.056 704.985 640.326 721.951 657.716 706.681 678.499 693.109 698.01 682.505 720.914 671.053 762.057 799.995 721.339 799.571 691.224 825.444 686.134 856.831 681.044 889.491"/>
          </a>
          <a href="#110">
            <polygon style={MapStyle.unselected} points="721.763 671.053 751.029 659.601 778.175 654.511 800.655 652.814 834.587 650.269 835.011 635.424 850.705 635.424 849.432 799.995 761.633 799.995"/>
          </a>
          <a href="#111">
            <polygon style={MapStyle.unselected} points="851.129 635.848 934.263 635.848 934.263 648.997 966.498 649.845 966.498 799.995 849.857 799.995"/>
          </a>
          <a href="#112">
            <polygon style={MapStyle.unselected} points="966.498 681.656 1067.446 681.656 1067.871 799.995 966.498 799.146"/>
          </a>
          <a href="#113">
            <polygon style={MapStyle.unselected} points="1067.871 681.656 1081.019 681.656 1080.595 662.57 1199.358 662.994 1198.933 800.419 1068.295 799.571"/>
          </a>
          <a href="#114">
            <polygon style={MapStyle.unselected} points="1199.782 662.994 1230.321 665.963 1261.284 668.084 1301.578 678.687 1264.677 800.419 1199.358 799.995"/>
          </a>
          <a href="#115">
            <polygon style={MapStyle.unselected} points="1302.002 679.112 1335.086 693.957 1362.656 708.378 1384.288 722.375 1396.588 707.106 1419.068 726.617 1441.124 750.369 1458.515 774.122 1343.145 890.763 1332.541 822.475 1311.334 801.267 1265.525 799.571"/>
          </a>
          <a href="#116">
            <polygon style={MapStyle.unselected} points="1343.145 889.491 1459.363 773.697"/>
          </a>
        </svg>
      </div>


    );
  }
}

export default Map;
