import Vue from 'vue'
import { Button,Message,Form,FormItem,Input,container,header,aside,main,Menu,Submenu,MenuItemGroup,MenuItem,Breadcrumb,BreadcrumbItem ,Card,Row,Col,Dialog,Table,TableColumn,Switch,Tooltip,Pagination,MessageBox,Tag,Tree,Select,Option,Cascader,Calendar,Alert,Steps,Step,Tabs,TabPane,Upload,Divider,DatePicker,CheckboxGroup,Checkbox} from 'element-ui'
import Chat from 'jwchat';
Vue.use(Button),
Vue.use(Form),
Vue.use(FormItem),
Vue.use(Input),
Vue.use(container),
Vue.use(header),
Vue.use(aside),
Vue.use(main),
Vue.use(Menu),
Vue.use(Submenu),
Vue.use(MenuItem),
Vue.use(MenuItemGroup),
Vue.use(Breadcrumb),
Vue.use(BreadcrumbItem),
Vue.use(Card),
Vue.use(Row),
Vue.use(Col),
Vue.use(Dialog),
    Vue.use(Table),
    Vue.use(TableColumn),
    Vue.use(Switch),
    Vue.use(Tooltip),
    Vue.use(Pagination),
    Vue.use(Tag),
   Vue.use(Tree),
Vue.use(Select),
Vue.use(Option),
    Vue.use(Cascader)
Vue.use(Calendar)
Vue.use(Alert)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Upload)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(Chat)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm
