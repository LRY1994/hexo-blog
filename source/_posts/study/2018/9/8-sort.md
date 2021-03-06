---
title: 八大排序算法、KMP
date:   2018/9/8
categories: 
    - 学习
tags:
    - 面经
---
 {%asset_img 8-sort.png%}

当n较大，则应采用时间复杂度为O(nlog2n)的排序方法：快速排序、堆排序或归并排序。

快速排序：是目前基于比较的内部排序中被认为是最好的方法，当待排序的关键字是随机分布时，快速排序的平均时间最短；

## 插入排序—直接插入排序(Straight Insertion Sort)
时间复杂度：O（n^2）稳定
#### 基本思想:
每个元素向前找到属于自己的位置，后面元素后移.

将一个记录插入到已排序好的有序表中，从而得到一个新，记录数增1的>有序表。即：先将序列的第1个记录看成是一个有序的子序列，然后从第>2个记录逐个进行插入，直至整个序列有序为止。

要点：设立哨兵，作为临时存储和判断数组边界之用。

直接插入排序示例：
 {%asset_img insert_sort.png%}

如果碰见一个和插入元素相等的，那么插入元素把想插入的元素放在相等元素的后面。所以，相等元素的前后顺序没有改变，从原无序序列出去的顺序就是排好序后的顺序，所以插入排序是``稳定``的。

#### 算法的实现：
```js
function InsertSort(a) 
{ 
for(let i= 1; i<a.length; i++){ 
    if(a[i] < a[i-1]){ //若第i个元素大于i-1元素，直接插入。小于的话，移动有序表后插入  
        let x = a[i]; //复制为哨兵，即存储待排序元素 
        a[i] = a[i-1]; //先后移一个元素 

        let j= i-1; 
        while(j>=0&&x < a[j]){ //查找在有序表的插入位置 
            a[j+1] = a[j]; 
            j--; //元素后移 ,这里减多了一次
        } 
        a[j+1] = x; //插入到正确位置 ,记得j+1
    } 
    } 

} 
a=[3,1,5,7,2,4,9,6]
InsertSort(a) 
```

其他的插入排序有二分插入排序，2-路插入排序。

## 插入排序—希尔排序（Shell`s Sort）

希尔排序是1959 年由D.L.Shell 提出来的，相对直接排序有较大的改进。希尔排序又叫缩小增量排序

#### 基本思想：
先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录“基本有序”时，再对全体记录进行依次直接插入排序。

#### 操作方法：
1.选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
2.按增量序列个数k，对序列进行k 趟排序；
3.每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

希尔排序的示例：
 {%asset_img shell_sort.png%}

#### 算法实现：

我们简单处理增量序列：增量序列d = {n/2 ,n/4, n/8 .....1} n为要排序数的个数

即：先将要排序的一组记录按某个增量d（n/2,n为要排序数的个数）分成若干组子序列，每组中记录的下标相差d.对每组中全部元素进行直接插入排序，然后再用一个较小的增量（d/2）对它进行分组，在每组中再进行直接插入排序。继续不断缩小增量直至为1，最后使用直接插入排序完成排序。

```js 

function ShellInsertSort(a, dk) 
{ 
for(let i= dk; i<a.length; ++i){ 
    if(a[i] < a[i-dk]){ //若第i个元素大于i-1元素，直接插入。小于的话，移动有序表后插入 
        let j = i-dk; 
        let x = a[i]; //复制为哨兵，即存储待排序元素 
        a[i] = a[i-dk]; //首先后移一个元素 
        while(x < a[j]){ //查找在有序表的插入位置 
            a[j+dk] = a[j]; 
            j -= dk; //元素后移 
        } 
        a[j+dk] = x; //插入到正确位置 
    } 
} 

} 
 
function shellSort(a){ 
    let len = a.length;
    let dk = len/2; 
    while( dk >= 1 ){ 
        ShellInsertSort(a, dk); 
        dk = dk/2; 
    } 
} 

 a= [3,1,5,7,2,4,9,6]; 
//ShellInsertSort(a,8,1); //直接插入排序 
shellSort(a,8); //希尔插入排序 

```
#### 分析
希尔排序时效分析很难，关键码的比较次数与记录移动次数依赖于增量因子序列d的选取，特定情况下可以准确估算出关键码的比较次数和记录的移动次数。目前还没有人给出选取最好的增量因子序列的方法。增量因子序列可以有各种取法，有取奇数的，也有取质数的，但需要注意：增量因子中除1 外没有公因子，且最后一个增量因子必须为1。希尔排序方法是一个不稳定的排序方法。

## 选择排序—简单选择排序（Simple Selection Sort）

#### 基本思想：
在要排序的一组数中，选出最小（或者最大）的一个数与第1个位置的数交换；然后在剩下的数当中再找最小（或者最大）的与第2个位置的数交换，依次类推，直到第n-1个元素（倒数第二个数）和第n个元素（最后一个数）比较为止。

简单选择排序的示例：
{%asset_img select_sort.png%}

#### 操作方法：
第一趟，从n 个记录中找出关键码最小的记录与第一个记录交换；
第二趟，从第二个记录开始的n-1 个记录中再选出关键码最小的记录与第二个记录交换；
以此类推.....
第i 趟，则从第i 个记录开始的n-i+1 个记录中选出关键码最小的记录与第i 个记录交换，
直到整个序列按关键码有序。

#### 算法实现：
```js
function SelectMinKey(a,start) 
{ 
let k = start; 
for(let j=start+1 ;j<a.length; ++j) { 
    if(a[k] > a[j]) k = j; 
} 
return k; 
} 

function selectSort(a){ 
    let key, tmp; 
    for(let i = 0; i< a.length; ++i) { 
        key = SelectMinKey(a,i); //选择最小的元素 
        if(key != i){ 
        tmp = a[i]; a[i] = a[key]; a[key] = tmp; //最小元素与第i位置元素互换 
        } 
    } 
} 

a = [3,1,5,7,2,4,9,6]; 
selectSort(a, 8); 

```
简单选择排序的改进——``二元选择排序``

简单选择排序，每趟循环只能确定一个元素排序后的定位。我们可以考虑改进为每趟循环确定两个元素（当前趟最大和最小记录）的位置,从而减少排序所需的循环次数。改进后对n个数据进行排序，最多只需进行[n/2]趟循环即可。具体实现如下：
```js
void SelectSort(int r[],int n) { 
int i ,j , min ,max, tmp; 
for (i=1 ;i <= n/2;i++) { 
// 做不超过n/2趟选择排序 
    min = i; max = i ; //分别记录最大和最小关键字记录位置 
    for (j= i+1; j<= n-i; j++) { 
        if (r[j] > r[max]) { 
            max = j ; continue ; 
        } 
        if (r[j]< r[min]) { 
            min = j ; 
        } 
    } 
    //该交换操作还可分情况讨论以提高效率 
    tmp = r[i-1]; r[i-1] = r[min]; r[min] = tmp; 
    tmp = r[n-i]; r[n-i] = r[max]; r[max] = tmp; 

    } 
} 
```
## 选择排序—堆排序（Heap Sort）

堆排序是一种树形选择排序，是对直接选择排序的有效改进。

#### 基本思想：
堆排序的基本思想是：将待排序序列构造成一个**大顶堆**，此时，整个序列的最大值就是堆顶的根节点。**将其与末尾元素进行交换，此时末尾就为最大值**。然后将剩余n-1个元素重新构造成一个堆，这样会得到n个元素的次小值。如此反复执行，便能得到一个有序序列了

因此，实现堆排序需解决两个问题：

1. 建堆。 如何将n 个待排序的数建成堆；
2. 调整堆。输出堆顶元素后，怎样调整剩余n-1 个元素，使其成为一个新堆。

首先讨论第二个问题：输出堆顶元素后，对剩余n-1元素重新建成堆的调整过程。

#### 调整小顶堆的方法：

1）设有m 个元素的堆，输出堆顶元素后，剩下m-1 个元素。将堆底元素送入堆顶（（最后一个元素与堆顶进行交换），堆被破坏，其原因仅是根结点不满足堆的性质。

2）将根结点与左、右子树中``**较小**``元素的进行交换。

3）若与左子树交换：如果左子树堆被破坏，即左子树的根结点不满足堆的性质，则重复方法 （2）.

4）若与右子树交换，如果右子树堆被破坏，即右子树的根结点不满足堆的性质。则重复方法 （2）.

5）继续对不满足堆性质的子树进行上述交换操作，直到叶子结点，堆被建成。

称这个自根结点到叶子结点的调整过程为筛选。如图：
{%asset_img heap_sort_1.png%}
 
再讨论对n 个元素初始建堆的过程。

#### 建堆方法：
对初始序列建堆的过程，就是一个反复进行筛选的过程。

1）n 个结点的完全二叉树，则最后一个结点是第 ``floor(n-2)``个结点的子树。

2）筛选从第``floor(n-2) ``个结点为根的子树开始，该子树成为堆。

3）之后向前依次对各结点为根的子树进行筛选，使之成为堆，直到根结点。

如图建堆初始过程：无序序列：（49，38，65，97，76，13，27，49）
 {%asset_img heap_sort_2.png%}

#### 算法的实现：

从算法描述来看，堆排序需要两个过程，一是建立堆，二是堆顶与堆的最后一个元素交换位置。所以堆排序有两个函数组成。一是建堆的渗透函数，二是反复调用渗透函数实现排序的函数。


```js
/* 排序思路：（升序）
 * 将堆根保存于尾部，并对剩余序列调用调整函数，调整完成后，再将最大跟保存于尾部-1（-1，-2，...，-i），
 * 再对剩余序列进行调整，反复进行该过程，直至排序完成。
 */

/* 将最大的元素调整到堆顶*/
function AdjustHeap(arr, pos, len){
    let swap = arr[pos];      //保存当前节点
    let child = pos * 2 + 1;  //定位到当前节点的左边的子节点
    while(child < len){       //递归遍历所有的子节点
        //判断当前节点是否有右节点，若右节点较大，就采用右节点和当前节点进行比较
        if(child + 1 < len && arr[child] < arr[child + 1]){
            child += 1;
        }
        //比较当前节点和最大的子节点，小于就交换，交换后将当前节点定位到子节点上
        if(arr[pos] < arr[child]){          
            arr[pos]=arr[child];        
            pos = child;
            child = pos * 2 + 1;
        }
        else{
            break;
        }
        arr[pos] = swap;
       
    }
}

/* 构建堆：
 * 满足：树中任一非叶子结点的关键字均不大于（或不小于）其左右孩子结点的关键字。
 * 实现：从最后一个拥有子节点的节点开始，将该节点和其他节点进行比较，将最大的数交换给该节点，
 *      交换后再依次向前节点进行相同的交换处理，直到构建出大顶堆。
 */
function BuildHeap(arr){
    let len =arr.length;
    let n= Math.floor((len-1)/2);

    for(let i=n; i>=0; i--){  //构建大顶堆
        AdjustHeap(arr, i, arr.length);//从第一个非叶子结点从下至上，从右至左调整结构
    } 
}

/*堆排序算法*/
function HeapSort(arr){
    BuildHeap(arr); //构建堆
    for(let i=arr.length-1; i>0; i--){   //从数组的尾部进行调整
        let swap = arr[i];  //堆顶永远是最大的元素,将堆顶和尾部元素交换，最大元素就保存在尾部，并且不参与后面的调整
        arr[i] = arr[0];
        arr[0] = swap;
        AdjustHeap(arr, 0, i); //重新对堆进行调整
    }
}

var arr = [46,12,33,72,68,19,80,33,1];
var arr = [46,12,33,72,68,19,80,33];

console.log('before: ' + arr);
HeapSort(arr);
console.log(' after: ' + arr);



```
分析:
堆排序是一种选择排序，整体主要由构建初始堆+交换堆顶元素和末尾元素并重建堆两部分组成。其中构建初始堆经推导复杂度为O(n)，在交换并重建堆的过程中，需交换n-1次，而重建堆的过程中，根据完全二叉树的性质，[log2(n-1),log2(n-2)...1]逐步递减，近似为nlogn。所以堆排序时间复杂度一般认为就是O(nlogn)级。

设树深度为k，k=floor(logn)+1 。从根到叶的筛选，元素比较次数至多2(k-1)次，交换记录至多k 次。所以，在建好堆后，排序过程中的筛选次数不超过下式：
 {%asset_img heap_sort_3.png%}
而建堆时的比较次数不超过4n 次，因此堆排序最坏情况下，时间复杂度也为：O(nlogn )。

## 交换排序—冒泡排序（Bubble Sort）（下沉）

#### 基本思想：
在要排序的一组数中，对当前还未排好序的范围内的全部数，自上而下对相邻的两个数依次进行比较和调整，让较大的数往下沉，较小的往上冒。即：每当两相邻的数比较后发现它们的排序与排序要求相反时，就将它们互换。

冒泡排序的示例：
{%asset_img bubble_sort.png%}
 
#### 算法的实现：
```js
void bubbleSort(int a[], int n){ 
for(int i =0 ; i< n-1; ++i) { //i只是次数
    for(int j = 0; j < n-i-1; ++j) { 
        if(a[j] > a[j+1]) { 
        int tmp = a[j] ;
         a[j] = a[j+1] ; 
         a[j+1] = tmp; 
        } 
    } 
} 
} 
```

#### 冒泡排序算法的改进

对冒泡排序常见的改进方法是加入一标志性变量``exchange``，用于标志某一趟排序过程中是否有数据交换，如果进行某一趟排序时并没有进行数据交换，则说明数据已经按要求排列好，可立即结束排序，避免不必要的比较过程。本文再提供以下两种改进算法：

1. 设置一标志性变量pos,用于记录每趟排序中最后一次进行交换的位置。由于**pos位置之后的记录均已交换到位**,故在进行下一趟排序时只要扫描到pos位置即可。

改进后算法如下:
```js
void Bubble_1 ( int r[], int n) { 
int i= n -1; //初始时,最后位置保持不变 
while ( i> 0) { 
    int pos= 0; //每趟开始时,无记录交换 
    for (int j= 0; j< i; j++) 
    if (r[j]> r[j+1]) { 
        pos= j; //记录交换的位置 
        int tmp = r[j]; r[j]=r[j+1];r[j+1]=tmp; 
    } 
    i= pos; //为下一趟排序作准备 
} 
} 
```
2. 传统冒泡排序中每一趟排序操作只能找到一个最大值或最小值,我们考虑利用在每趟排序中进行正向和反向两遍冒泡的方法一次可以得到两个最终值(最大者和最小者) , 从而使排序趟数几乎减少了一半。

改进后的算法实现为:
```js
void Bubble_2 ( int r[], int n){ 
    int low = 0; 
    int high= n -1; //设置变量的初始值 
    int tmp,j; 
    while (low < high) { 
        for (j= low; j< high; ++j){ //正向冒泡,找到最大者 
            if (r[j]> r[j+1]) { 
            tmp = r[j]; r[j]=r[j+1];r[j+1]=tmp; 
            } 
        }
        --high; //修改high值, 前移一位 

        for ( j=high; j>low; --j){ //反向冒泡,找到最小者 
            if (r[j]<r[j-1]) { 
                tmp = r[j]; r[j]=r[j-1];r[j-1]=tmp; 
            } 
        }
        ++low; //修改low值,后移一位 
        
    } 
} 
```
## 交换排序—快速排序（Quick Sort）

#### 基本思想：
    1）选择一个基准元素,通常选择第一个元素或者最后一个元素。
    2）通过一趟排序将待排序的记录分割成独立的两部分，其中一部分记录的元素值均比基准元素值小。另一部分记录的 元素值比基准值大。
    3）此时基准元素在其排好序后的正确位置。
    4）然后分别对这两部分记录用同样的方法继续进行排序，直到整个序列有序。

快速排序的示例：

（a）一趟排序的过程：
 {%asset_img bubble_sort_1.png%}

（b）排序的全过程
  {%asset_img bubble_sort_2.png%}

{%asset_img quick_sort.png%}
#### 算法的实现：
```js
 
function swap(s,t) { 
    let tmp = a[s];
    a[s]=a[t];
    a[t]=tmp; 
} 

function partition(a,low, high) { 
    let privotIndex=low;
    let privotKey = a[low]; //基准元素 
    while(low < high){ //从表的两端交替地向中间扫描 
        while(low < high && a[high] >= privotKey) --high; 
        while(low < high && a[low] <= privotKey ) ++low; 
        if(low < high) swap(low, high); 
    } 
    swap(low,privotIndex)
    return low; //这里low和high相等
} 


function quickSort(a, low, high){ 
    if(low < high){ 
        let privotLoc = partition(a, low, high); //将表一分为二 
        quickSort(a, low, privotLoc -1); //递归对低子表递归排序 
        quickSort(a, privotLoc + 1, high); //递归对高子表递归排序 
    } else{
        return
    }
} 


 a= [3,1,5,7,2,4,9,6,10,8]; 
quickSort(a,0,a.length-1); 

```
#### 分析

快速排序是通常被认为在同数量级（O(nlog2n)）的排序方法中平均性能最好的。但若初始序列按关键码有序或基本有序时，快排序反而蜕化为冒泡排序。为改进之，通常以“三者取中法”来选取基准记录，即将排序区间的两个端点与中点三个记录关键码居中的调整为支点记录。快速排序是一个``不稳定``的排序方法。

#### 快速排序的改进

在本改进算法中,只对长度大于k的子序列递归调用快速排序,让原序列基本有序，然后再对整个基本有序序列用插入排序算法排序。实践证明，改进后的算法时间复杂度有所降低，且当k取值为 8 左右时,改进算法的性能最佳。算法思想如下：
```js
void print(int a[], int n){ 
for(int j= 0; j<n; j++){ 
cout<<a[j] <<" "; 
} 
cout<<endl; 
} 

void swap(int *a, int *b) 
{ 
int tmp = *a; 
*a = *b; 
*b = tmp; 
} 

int partition(int a[], int low, int high) { 
    int privotKey = a[low]; //基准元素 
    while(low < high){ //从表的两端交替地向中间扫描 
        while(low < high && a[high] >= privotKey) --high; //从high 所指位置向前搜索，至多到low+1 位置。将比基准元素小的交换到低端 
        swap(&a[low], &a[high]); 
        while(low < high && a[low] <= privotKey ) ++low; 
        swap(&a[low], &a[high]); 
    } 
    print(a,10); 
    return low; 
} 


void qsort_improve(int r[ ],int low,int high, int k){ 
    if( high -low > k ) { //长度大于k时递归, k为指定的数 
        int pivot = partition(r, low, high); // 调用的Partition算法保持不变 
        qsort_improve(r, low, pivot - 1,k); 
        qsort_improve(r, pivot + 1, high,k); 
    } 
} 
void quickSort(int r[], int n, int k){ 
    qsort_improve(r,0,n,k);//先调用改进算法Qsort使之基本有序 

    //再用插入排序对基本有序序列排序 
    for(int i=1; i<=n;i ++){ 
        int tmp = r[i]; 
        int j=i-1; 
        while(tmp < r[j]){ 
            r[j+1]=r[j]; j=j-1; 
        } 
        r[j+1] = tmp; 
    } 
} 
int main(){ 
int a[10] = {3,1,5,7,2,4,9,6,10,8}; 
cout<<"初始值："; 
print(a,10); 
quickSort(a,9,4); 
cout<<"结果："; 
print(a,10); 

} 
```
## 归并排序（Merge Sort）

#### 基本思想：

归并（Merge）排序法是将两个（或两个以上）有序表合并成一个新的有序表，即把待排序序列分为若干个子序列，每个子序列是有序的。然后再把有序子序列合并为整体有序序列。

归并排序示例：
 {%asset_img merge_sort.png%}

 {%asset_img merge_sort2.png%}

```js

function merge(left, right) {
  var tmp = [];

  while (left.length && right.length) {
    if (left[0] < right[0])
      tmp.push(left.shift());
    else
      tmp.push(right.shift());
  }

  return tmp.concat(left, right);
}

function mergeSort(a) {
  if (a.length === 1) 
    return a;

  var mid = ~~(a.length / 2)
    , left = a.slice(0, mid)
    , right = a.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
} 
```
这段合并排序的代码相当简单直观，但是mergeSort()函数会导致很频繁的自调用。一个长度为n的数组最终会调用mergeSort() 2*n-1次，这意味着如果需要排序的数组长度很大会在某些栈小的浏览器上发生栈溢出错误。

这里插个话题，关于递归调用时浏览器的栈大小限制，可以用代码去测试：
```js
var cnt = 0;
try {
  (function() {
    cnt++;
    arguments.callee();
  })();
} catch(e) {
  console.log(e.message, cnt);
}


// chrome: Maximum call stack size exceeded 35992
// firefox: too much recursion 11953
```
遇到栈溢出错误并不一定要修改整个算法，只是表明递归不是最好的实现方式。这个合并排序算法同样可以迭代实现，比如（摘抄自《高性能JavaScript》）：
#### 归并的迭代算法

1个元素的表总是有序的。所以对n 个元素的待排序列，每个元素可看成1 个有序子表。对子表两两合并生成n/2个子表，所得子表除最后一个子表长度可能为1 外，其余子表长度均为2。再进行两两合并，直到生成n 个元素按关键码有序的表。
```js
function merge(left, right) {
  var result = [];

  while (left.length && right.length) {
    if (left[0] < right[0])
      result.push(left.shift());
    else
      result.push(right.shift());
  }

  return result.concat(left, right);
}

function mergeSort(a) {
  if (a.length === 1)
    return a;

  var work = [];
  for (var i = 0, len = a.length; i < len; i++)
    work.push([a[i]]);

  work.push([]); // 如果数组长度为奇数!!

  for (var lim = len; lim > 1; lim = ~~((lim + 1) / 2)) {
    for (var j = 0, k = 0; k < lim; j++, k += 2) //k < lim
      work[j] = merge(work[k], work[k + 1]);

    work[j] = []; // 如果数组长度为奇数!!
  }

  return work[0];
}

console.log(mergeSort([1, 3, 4, 2, 5, 0, 8, 10, 4])); 
```
#### 两路归并的递归算法
```js
void MSort(ElemType *r, ElemType *rf,int s, int t) 
{ 
ElemType *rf2; 
if(s==t) r[s] = rf[s]; 
else 
{ 
    int m=(s+t)/2; /*平分*p 表*/ 
    MSort(r, rf2, s, m); /*递归地将p[s…m]归并为有序的p2[s…m]*/ 
    MSort(r, rf2, m+1, t); /*递归地将p[m+1…t]归并为有序的p2[m+1…t]*/ 
    Merge(rf2, rf, s, m+1,t); /*将p2[s…m]和p2[m+1…t]归并到p1[s…t]*/ 
} 
} 
void MergeSort_recursive(ElemType *r, ElemType *rf, int n) 
{ /*对顺序表*p 作归并排序*/ 
    MSort(r, rf,0, n-1); 
} 
```

## 桶排序/基数排序(Radix Sort)

### 桶排序

#### 基本思想
是将阵列分到有限数量的桶子里。每个桶子再个别排序（有可能再使用别的排序算法或是以递回方式继续使用桶排序进行排序）。桶排序是鸽巢排序的一种归纳结果。当要被排序的阵列内的数值是均匀分配的时候，桶排序使用线性时间（Θ（n））。但桶排序并不是 比较排序，他不受到 O(n log n) 下限的影响。

简单来说，就是把数据分组，放在一个个的桶中，然后对每个桶里面的在进行排序。

例如要对大小为[1..1000]范围内的n个整数A[1..n]排序

首先，可以把桶设为大小为10的范围，具体而言，设集合B[1]存储[1..10]的整数，集合B[2]存储 (10..20]的整数，……集合B[i]存储( (i-1)*10, i*10]的整数，i = 1,2,..100。总共有 100个桶。

然后，对A[1..n]从头到尾扫描一遍，把每个A[i]放入对应的桶B[j]中。 再对这100个桶中每个桶里的数字排序，这时可用冒泡，选择，乃至快排，一般来说任 何排序法都可以。

最后，依次输出每个桶里面的数字，且每个桶中的数字从小到大输出，这 样就得到所有数字排好序的一个序列了。

假设有n个数字，有m个桶，如果数字是平均分布的，则每个桶里面平均有n/m个数字。如果对每个桶中的数字采用快速排序，那么整个算法的复杂度是 O(n + m * n/m*log(n/m)) = O(n + nlogn - nlogm) 从上式看出，当m接近n的时候，桶排序复杂度接近O(n)

当然，以上复杂度的计算是基于输入的n个数字是平均分布这个假设的。这个假设是很强的 ，实际应用中效果并没有这么好。如果所有的数字都落在同一个桶中，那就退化成一般的排序了。

前面说的几大排序算法 ，大部分时间复杂度都是O（n2），也有部分排序算法时间复杂度是O(nlogn)。而桶式排序却能实现O（n）的时间复杂度。

但桶排序的缺点是：

1）首先是空间复杂度比较高，需要的额外开销大。排序有两个数组的空间开销，一个存放待排序数组，一个就是所谓的桶，比如待排序值是从0到m-1，那就需要m个桶，这个桶数组就要至少m个空间。

2）其次待排序的元素都要在一定的范围内等等。

桶式排序是一种分配排序。分配排序的特定是不需要进行关键码的比较，但前提是要知道待排序列的一些具体情况。

分配排序的基本思想：说白了就是进行多次的桶式排序。

基数排序过程无须比较关键字，而是通过“分配”和“收集”过程来实现排序。它们的时间复杂度可达到线性阶：O(n)。

实例:

扑克牌中52 张牌，可按花色和面值分成两个字段，其大小关系为：
 {%asset_img tong_sort_1.png%}
若对扑克牌按花色、面值进行升序排序，得到如下序列：
 {%asset_img tong_sort_2.png%}
 
即两张牌，若花色不同，不论面值怎样，花色低的那张牌小于花色高的，只有在同花色情况下，大小关系才由面值的大小确定。这就是多关键码排序。

为得到排序结果，我们讨论两种排序方法。

方法1：先对花色排序，将其分为4 个组，即梅花组、方块组、红心组、黑心组。再对每个组分别按面值进行排序，最后，将4 个组连接起来即可。

方法2：先按13 个面值给出13 个编号组(2 号，3 号，...，A 号)，将牌按面值依次放入对应的编号组，分成13 堆。再按花色给出4 个编号组(梅花、方块、红心、黑心)，将2号组中牌取出分别放入对应花色组，再将3 号组中牌取出分别放入对应花色组，……，这样，4 个花色组中均按面值有序，然后，将4 个花色组依次连接起来即可。

设n 个元素的待排序列包含d 个关键码{k1，k2，…，kd}，则称序列对关键码{k1，k2，…，kd}有序是指：对于序列中任两个记录r[i]和r[j](1≤i≤j≤n)都满足下列有序关系：

其中k1 称为最主位关键码，kd 称为最次位关键码 。

#### 两种多关键码排序方法：

多关键码排序按照从最主位关键码到最次位关键码或从最次位到最主位关键码的顺序逐次排序，分两种方法：

最高位优先(Most Significant Digit first)法，简称MSD 法：

1）先按k1 排序分组，将序列分成若干子序列，同一组序列的记录中，关键码k1 相等。

2）再对各组按k2 排序分成子组，之后，对后面的关键码继续这样的排序分组，直到按最次位关键码kd 对各子组排序后。

3）再将各组连接起来，便得到一个有序序列。扑克牌按花色、面值排序中介绍的方法一即是MSD 法。

最低位优先(Least Significant Digit first)法，简称LSD 法：

1) 先从kd 开始排序，再对kd-1进行排序，依次重复，直到按k1排序分组分成最小的子序列后。

2) 最后将各个子序列连接起来，便可得到一个有序的序列, 扑克牌按花色、面值排序中介绍的方法二即是LSD 法。

#### 基于LSD方法的链式基数排序的基本思想

“多关键字排序”的思想实现“单关键字排序”。对数字型或字符型的单关键字，可以看作由多个数位或多个字符构成的多关键字，此时可以采用“分配-收集”的方法进行排序，这一过程称作基数排序法，其中每个数字或字符可能的取值个数称为基数。比如，扑克牌的花色基数为4，面值基数为13。在整理扑克牌时，既可以先按花色整理，也可以先按面值整理。按花色整理时，先按红、黑、方、花的顺序分成4摞（分配），再按此顺序再叠放在一起（收集），然后按面值的顺序分成13摞（分配），再按此顺序叠放在一起（收集），如此进行二次分配和收集即可将扑克牌排列有序。

## 基数排序:
O(d(n+r)，其中：d为待排列数字的最大位数，n为待排序列的长度，r为进制数 

是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。基数排序基于分别排序，分别收集，所以是稳定的。

#### 算法实现

```js
/*
/*

// 第一步

0 90 100
1 
2
3
4
5 15 75
6 46
7 37
8 48
9 99

=> 90 100 15 75 46 37 48 99

// 第二步

0 100
1 15
2
3 37
4 46 48
5
6
7 75
8
9 90 99

=> 100 15 37 46 48 75 90 99

// 第三步

0 15 37 46 48 75 90 99
1 100 
2
3
4
5
6
7
8
9
=> 15 37 46 48 75 90 99 100
*/
var counter = [];
function radixSort(arr, maxDigit) {
    var mod = 10;
    var dev = 1;
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for(var j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod) / dev);
            if(counter[bucket]==null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        //按照bucket的 顺序写入数组
        var pos = 0;
        for(var j = 0; j < counter.length; j++) {
            var value = null;
            if(counter[j]!=null) {
                while ((value = counter[j].shift()) != null) {
                      arr[pos++] = value;
                }
          }
        }
    }
    return arr;
} 
```
## 总结
 {%asset_img all_sort.png%}

各种排序的稳定性，时间复杂度和空间复杂度总结：
#### 时间复杂度来说：

(1)平方阶(O(n2))排序
各类简单排序:直接插入、直接选择和冒泡排序；

(2)线性对数阶(O(nlog2n))排序
快速排序、堆排序和归并排序；

(3)O(n1+§))排序,§是介于0和1之间的常数。
希尔排序

(4)线性阶(O(n))排序
基数排序，此外还有桶、箱排序。

说明：

当原表有序或基本有序时，直接插入排序和冒泡排序将大大减少比较次数和移动记录的次数，时间复杂度可降至O（n）；

而快速排序则相反，当原表基本有序时，将蜕化为冒泡排序，时间复杂度提高为O（n2）；

原表是否有序，对简单选择排序、堆排序、归并排序和基数排序的时间复杂度影响不大。

#### 稳定性：

排序算法的稳定性:若待排序的序列中，存在多个具有相同关键字的记录，经过排序， 这些记录的相对次序保持不变，则称该算法是稳定的；若经排序后，记录的相对 次序发生了改变，则称该算法是不稳定的。

稳定性的好处：排序算法如果是稳定的，那么从一个键上排序，然后再从另一个键上排序，第一个键排序的结果可以为第二个键排序所用。基数排序就是这样，先按低位排序，逐次按高位排序，低位相同的元素其顺序再高位也相同时是不会改变的。另外，如果排序算法稳定，可以避免多余的比较；

**稳定的排序算法：冒泡排序、插入排序、归并排序和基数排序**

**不是稳定的排序算法：选择排序、快速排序、希尔排序、堆排序**

#### 选择排序算法准则：

每种排序算法都各有优缺点。因此，在实用时需根据不同情况适当选用，甚至可以将多种方法结合起来使用。

选择排序算法的依据

影响排序的因素有很多，平均时间复杂度低的算法并不一定就是最优的。相反，有时平均时间复杂度高的算法可能更适合某些特殊情况。同时，选择算法时还得考虑它的可读性，以利于软件的维护。一般而言，需要考虑的因素有以下四点：

1.待排序的记录数目n的大小；
2.记录本身数据量的大小，也就是记录中除关键字外的其他信息量的大小；
3.关键字的结构及其分布情况；
4.对排序稳定性的要求。

设待排序元素的个数为n.

1）当n较大，则应采用时间复杂度为O(nlog2n)的排序方法：快速排序、堆排序或归并排序序。
快速排序：是目前基于比较的内部排序中被认为是最好的方法，当待排序的关键字是随机分布时，快速排序的平均时间最短；
堆排序：如果内存空间允许且要求稳定性的，
归并排序：它有一定数量的数据移动，所以我们可能过与插入排序组合，先获得一定长度的序列，然后再合并，在效率上将有所提高。

2）当n较大，内存空间允许，且要求稳定性 =》归并排序

3）当n较小，可采用直接插入或直接选择排序。
直接插入排序：当元素分布有序，直接插入排序将大大减少比较次数和移动记录的次数。
直接选择排序：元素分布有序，如果不要求稳定性，选择直接选择排序

5）一般不使用或不直接使用传统的冒泡排序。

6）基数排序
它是一种稳定的排序算法，但有一定的局限性：

1、关键字可分解。
2、记录的关键字位数较少，如果密集更好
3、如果是数字时，最好是无符号的，否则将增加相应的映射复杂度，可先将其正负分开排序。


## P问题
P是一个判定问题类,这些问题可以用一个确定性算法在多项式时间内判定或解出。如果一个判定性问题的复杂度是该问题的一个实例的规模n的多项式函数，则我们说这种可以在多项式时间内解决的判定性问题属于P类问题。P类问题就是所有复杂度为多项式时间的问题的集合。
NP是一个判定问题类,这些问题可以用一个确定算法在多项式时间内检查或验证出它们的解;P事实上很直观,我们通常在编程中求解的问题大多都是P类问题.比如说排序,找最短路径等.
2、NP问题 然而有些问题很难找到多项式时间的算法（或许根本不存在），比如找出无向图中的哈米尔顿回路问题，但是我们发现如果给了我们该问题的一个答案，我们可以在多项式时间内判断这个答案是否正确。比如说对于哈米尔顿回路问题，给一个任意的回路，我们很容易判断他是否是哈米尔顿回路（只要看是不是所有的顶点都在回路中就可以了）。这种可以在多项式时间内验证一个解是否正确的问题称为NP问题。显然，所有的P类问题都是属于NP问题的，但是现在的问题是，P是否等于NP?这个问题至今还未解决。
NP这个类事实上也很有趣,它并不要求给出一个算法来求解问题本身,而只是要求给出一个确定性算法在多项式时间内验证它的解.
3、NP完全问题 此外请注意，NP问题不一定都是难解的问题，比如，简单的数组排序问题是P类问题，但是P属于NP，所以也是NP问题，你能说他很难解么？刚才说了，现在还不知道是否有P=NP或者P<>NP，但是后来人们发现还有一系列的特殊NP问题，这类问题的特殊性质使得很多人相信P<>NP，只不过现在还无法证明。这类特殊的NP问题就是NP完全问题（NPC问题，C代表complete）。 NP完全问题是求NP中判定问题的一个子类.NPC问题存在着一个令人惊讶的性质，即如果一个NPC问题存在多项式时间的算法，则所有的NP问题都可以在多项式时间内求解，即P=NP成立！！这是因为，每一个NPC问题可以在多项式时间内转化成任何一个NP问题。比如前面说的哈米尔顿回路问题就是一个NPC问题。NPC问题的历史并不久，cook在1971年找到了第一个NPC问题，此后人们又陆续发现很多NPC问题，现在可能已经有3000多个了。所以，我们一般认为NPC问题是难解的问题，因为他不太可能存在一个多项式时间的算法（如果存在则所有的NP问题都存在多项式时间算法，这太不可思议了，但是也不是不可能）。类似哈米尔顿回路/路径问题，货郎担问题，集团问题，最小边覆盖问题（注意和路径覆盖的区别），等等很多问题都是NPC问题，所以都是难解的问题。


## KMP
手算KMP匹配的Next值和Nextval值
[https://www.slyar.com/blog/kmp-next-nextval.html](https://www.slyar.com/blog/kmp-next-nextval.html)
[http://blog.csdn.net/yutianzuijin/article/details](http://blog.csdn.net/yutianzuijin/article/details/11954939)

字符串f每一个位置的最大公共长度。这个最大公共长度在算法导论里面被记为next数组。假设我们现在已经求得next[1]、next[2]、……next[i]，分别表示长度为1到i的字符串的前缀和后缀最大公共长度，现在要求next[i+1]。由上图我们可以看到，
1、如果位置i和位置next[i]处的两个字符相同（下标从零开始），则next[i+1]等于next[i]加1
2、如果两个位置的字符不相同，我们可以将长度为next[i]的字符串继续分割，获得其最大公共长度next[next[i]]，然后再和位置i的字符比较。如果位置next[next[i]]和位置i的字符相同，则next[i+1]就等于next[next[i]]加1。如果不相等，就可以继续分割长度为next[next[i]]的字符串，直到字符串长度为0为止
 ```js
void getNext(char*t)
{
    int i=0;
    int j=-1;
    next[i]=-1;
    int lent=strlen(t);
    while(i<lent){
        if(j==-1||t[i]==t[j]){
            i++;
            j++;
            next[i]=j;
        }
        else j=next[j];
    }
}

int kmp(char*s,char*t){
    int lens=strlen(s);
    int lent=strlen(t);
    getNext (t);
    int i=-1,j=-1;
    int cnt=0;
    while(i<lens){
        if(j==-1||t[j]==s[i]) {
            i++;
            j++;
        }
    // 如果第i+1个位置不同，则出现不匹配，我们依旧要将长度为j的字符串分割，获得其最大公共长度next[j]，然后从next[j]继续比较两个字符串
        else j=next[j];。
        if(j==lent){
            j--;
            i--;
            j=next[j];
            cnt++;
        }
    }
    return cnt;//s中有cnt 个t子串
}
 
```



