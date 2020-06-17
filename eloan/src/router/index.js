import Vue from 'vue'
import Router from 'vue-router'

/* pages */ 
/*進件作業*/
import FeedOperation from "../components/進件作業/進件作業.vue";
import ApplicationCase from "../components/進件作業/申請案件.vue";
import ApplicationInformation from "../components/進件作業/申請資訊.vue";
import Guarantor from "../components/進件作業/保證人.vue";
import Borrower from "../components/進件作業/借款人.vue";

/*徵信作業*/
import CreditWork from "../components/徵信作業/徵信作業.vue";
import InlineQuery from "../components/徵信作業/行內查詢.vue";
import JointQuery from "../components/徵信作業/聯徵查詢.vue";
import TicketQuery from "../components/徵信作業/票信查詢.vue";
import IncomeRatio from "../components/徵信作業/DBR支出所得比試算.vue";
import Relationship from "../components/徵信作業/關係歸戶表.vue";
import AlertList from "../components/徵信作業/警示名單.vue";
import Comparison from "../components/徵信作業/標籤比對.vue";

Vue.use(Router)

var router = new Router({
    // 使用 HTML 5 模式
    mode: 'history',
    routes: [
        {
            path: '',
            name: 'FeedOperation',
            component: FeedOperation,
            meta: { requireAuth: true },
            redirect: {
                name: 'ApplicationInformation'
            },
            children: [{
                    path: '',
                    name: 'ApplicationInformation',
                    component: ApplicationInformation
                },
                {
                    path: 'ApplicationCase',
                    name: 'ApplicationCase',
                    component: ApplicationCase
                },
                {
                    path: 'Borrower',
                    name: 'Borrower',
                    component: Borrower
                },
                {
                    path: 'Guarantor',
                    name: 'Guarantor',
                    component: Guarantor
                }
            ]
        },{
            path: '/CreditWork',
            name:"CreditWork",
            meta: { requireAuth: true },
            component: CreditWork,
            redirect: {
                name: 'InlineQuery'
            },
            children:[
                {
                    path:"",
                    name:"InlineQuery",
                    component:InlineQuery
                },
                {
                    path:"JointQuery",
                    name:"JointQuery",
                    component:JointQuery
                },{
                    path:"TicketQuery",
                    name:"TicketQuery",
                    component:TicketQuery
                },{
                    path:"IncomeRatio",
                    name:"IncomeRatio",
                    component:IncomeRatio
                },{
                    path:"Relationship",
                    name:"Relationship",
                    component:Relationship
                },{
                    path:"AlertList",
                    name:"AlertList",
                    component:AlertList
                },{
                    path:"Comparison",
                    name:"Comparison",
                    component:Comparison
                }
            ]
        }
    ],
    // 因 bootstrap 預設套用頁簽，正在使用的頁簽超連結 a 的 css 為 active
    // 所以可以透過此設定將 'router-link-active' 改為 'active'
    linkActiveClass: 'active'
})



// // Navigation hook
// router.beforeEach(async(to, from, next) => {
//     if (to.matched.some(record => record.meta.requireAuth)) {

//         // this route requires auth (record.meta.requireAuth == true)

//         let isLogin = false;
        
//         // 兩種方式判斷登入與否:
//         // 1. 前端確認登入沒 (但是有可能過期或直接被server side強制踢出，但反正資料一定會再跟server要，到時再驗證token囉)
//         // 2. 最保險就是直接ajax透過後端檢查token囉
//         let currentToken = localStorage.getItem(constantService.localStorage.tokenKey);
//         if (currentToken) {

//             // [client side] 判斷有token就算登入可轉頁 
//             // 反正後續重要資料一定從server端，會在取資料時進行server端token驗證
//             isLogin = true;

//             // [server side] 直接透過ajax讓後端檢查token合法性
//             // 在此須使用同步的方式，等待處理結果後才能繼續往下走
//             let data = await authService.isTokenAlive();
//             isLogin = data;
//         }

//         if (isLogin === false && from.path !== '/login') {
//             next({
//                 path: '/login',
//                 query: { redirect: to.fullPath }
//             })
//         } else {
//             next() //必須向下走
//         }

//     } else {
//         next() // 必須向下走
//     }
// })

export default router;