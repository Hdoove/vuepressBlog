### typescript with react

### 配置

#### tsconfig.json

> create-react-app my-app --template typescript

推荐配置

```json

{
  "compilerOptions": {
    "target": "es5", // 指定 ECMAScript 版本
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ], // 要包含在编译中的依赖库文件列表
    "allowJs": true, // 允许编译 JavaScript 文件
    "skipLibCheck": true, // 跳过所有声明文件的类型检查
    "esModuleInterop": true, // 禁用命名空间引用 (import * as fs from "fs") 启用 CJS/AMD/UMD 风格引用 (import fs from "fs")
    "allowSyntheticDefaultImports": true, // 允许从没有默认导出的模块进行默认导入
    "strict": true, // 启用所有严格类型检查选项
    "forceConsistentCasingInFileNames": true, // 不允许对同一个文件使用不一致格式的引用
    "module": "esnext", // 指定模块代码生成
    "moduleResolution": "node", // 使用 Node.js 风格解析模块
    "resolveJsonModule": true, // 允许使用 .json 扩展名导入的模块
    "noEmit": true, // 不输出(意思是不编译代码，只执行类型检查)
    "jsx": "react", // 在.tsx文件中支持JSX
    "sourceMap": true, // 生成相应的.map文件
    "declaration": true, // 生成相应的.d.ts文件
    "noUnusedLocals": true, // 报告未使用的本地变量的错误
    "noUnusedParameters": true, // 报告未使用参数的错误
    "experimentalDecorators": true, // 启用对ES装饰器的实验性支持
    "incremental": true, // 通过从以前的编译中读取/写入信息到磁盘上的文件来启用增量编译
    "noFallthroughCasesInSwitch": true 
  },
  "include": [
    "src/**/*" // *** TypeScript文件应该进行类型检查 ***
  ],
  "exclude": ["node_modules", "build"] // *** 不进行类型检查的文件 ***
}

```

#### ESLint/Prettier

1. 安装依赖

> yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react --dev

2. 在根目录下创建一个eslintrc.js 文件并添加以下内容

```javascript

module.exports =  {
  parser:  '@typescript-eslint/parser',  // 指定ESLint解析器
  extends:  [
    'plugin:react/recommended',  // 使用来自 @eslint-plugin-react 的推荐规则
    'plugin:@typescript-eslint/recommended',  // 使用来自@typescript-eslint/eslint-plugin的推荐规则
  ],
  parserOptions:  {
  ecmaVersion:  2018,  // 允许解析最新的 ECMAScript 特性
  sourceType:  'module',  // 允许使用 import
  ecmaFeatures:  {
    jsx:  true,  // 允许对JSX进行解析
  },
  },
  rules:  {
    // 自定义规则
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
  settings:  {
    react:  {
      version:  'detect',  // 告诉 eslint-plugin-react 自动检测 React 的版本
    },
  },
};

```

3. 添加 Prettier 依赖

> yarn add prettier eslint-config-prettier eslint-plugin-prettier --dev

4. 在根目录下创建一个 .prettierrc.js 文件并添加以下内容：

```javascript

module.exports =  {
  semi:  true,
  trailingComma:  'all',
  singleQuote:  true,
  printWidth:  120,
  tabWidth:  4,
};

```

5. 更新 .eslintrc.js 文件

```javascript

module.exports =  {
  parser:  '@typescript-eslint/parser',  // 指定ESLint解析器
  extends:  [
    'plugin:react/recommended',  // 使用来自 @eslint-plugin-react 的推荐规则
    'plugin:@typescript-eslint/recommended',  // 使用来自@typescript-eslint/eslint-plugin的推荐规则
    'prettier/@typescript-eslint',  // 使用 ESLint -config-prettier 禁用来自@typescript-eslint/ ESLint 与 prettier 冲突的 ESLint 规则
    'plugin:prettier/recommended',  
  ],
  parserOptions:  {
  ecmaVersion:  2018,  // 允许解析最新的 ECMAScript 特性
  sourceType:  'module',  // 允许使用 import
  ecmaFeatures:  {
    jsx:  true,  // 允许对JSX进行解析
  },
  },
  rules:  {
    // 自定义规则
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
  settings:  {
    react:  {
      version:  'detect',  // 告诉 eslint-plugin-react 自动检测 React 的版本
    },
  },
};

```