// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('backToTop');
    const summaryTable = document.getElementById('summaryTable');

    // 滚动时显示/隐藏回到顶部按钮
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset + 100;
        if (scrollPosition > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // 回到顶部功能
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });



    // 表格排序功能
    function sortTable(columnIndex, dataType) {
        const tbody = summaryTable.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        let sortDirection = 'asc';

        // 检查当前排序方向
        const header = summaryTable.querySelectorAll('th')[columnIndex];
        if (header.classList.contains('sort-asc')) {
            sortDirection = 'desc';
            header.classList.remove('sort-asc');
            header.classList.add('sort-desc');
        } else {
            // 移除所有排序类
            summaryTable.querySelectorAll('th').forEach(th => {
                th.classList.remove('sort-asc', 'sort-desc');
            });
            header.classList.add('sort-asc');
        }

        // 排序行
        rows.sort((a, b) => {
            const aValue = a.querySelectorAll('td')[columnIndex].textContent.trim();
            const bValue = b.querySelectorAll('td')[columnIndex].textContent.trim();

            let comparison = 0;

            if (dataType === 'number') {
                comparison = parseFloat(aValue) - parseFloat(bValue);
            } else {
                comparison = aValue.localeCompare(bValue, 'zh-CN');
            }

            return sortDirection === 'asc' ? comparison : -comparison;
        });

        // 重新添加行
        rows.forEach(row => tbody.appendChild(row));
    }

    // 为表头添加排序事件
    summaryTable.querySelectorAll('th').forEach((th, index) => {
        const dataSort = th.getAttribute('data-sort');
        if (dataSort) {
            th.style.cursor = 'pointer';
            th.addEventListener('click', () => sortTable(index, dataSort));
        }
    });

    // 卡片动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 初始设置卡片样式
    document.querySelectorAll('.station-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // 页面加载完成后触发一次滚动事件，确保导航状态正确
    window.dispatchEvent(new Event('scroll'));

    // 初始化表格排序
    summaryTable.querySelectorAll('th').forEach(th => {
        th.style.position = 'relative';
    });

    console.log('教学网站交互功能已加载完成！');
});

// 添加一些额外的交互效果
window.addEventListener('load', function() {
    // 页面加载时的淡入效果
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);

    // 为站点添加进入动画
    const stations = document.querySelectorAll('.station');
    stations.forEach((station, index) => {
        station.style.opacity = '0';
        station.style.transform = 'translateY(30px)';
        station.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(function() {
            station.style.opacity = '1';
            station.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
});// 导航菜单高亮当前页面
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面的URL
    const currentUrl = window.location.pathname;
    const currentPage = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 高亮当前页面的导航链接
    navLinks.forEach(link => {
        const linkUrl = link.getAttribute('href');
        if (linkUrl === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // 为卡片添加动画效果
    const animateCards = () => {
        const cards = document.querySelectorAll('.station-card');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardPosition < windowHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
            }
        });
    };
    
    // 设置卡片初始状态
    const cards = document.querySelectorAll('.station-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 初始化动画
    animateCards();
    
    // 滚动时触发动画
    window.addEventListener('scroll', animateCards);
    
    // 图片容器交互效果
    const imageContainers = document.querySelectorAll('.image-container');
    
    imageContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    

    
    // 为表格添加排序功能
    const makeTableSortable = () => {
        const table = document.querySelector('.summary-table');
        if (!table) return;
        
        const headers = table.querySelectorAll('th');
        
        headers.forEach((header, index) => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                sortTable(table, index);
            });
        });
    };
    
    // 表格排序函数
    const sortTable = (table, columnIndex) => {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const isAscending = table.getAttribute('data-sort-dir') !== 'asc';
        
        // 排序行
        rows.sort((a, b) => {
            const aText = a.cells[columnIndex].textContent.trim();
            const bText = b.cells[columnIndex].textContent.trim();
            
            // 检查是否为数字
            const aNum = parseFloat(aText);
            const bNum = parseFloat(bText);
            
            if (!isNaN(aNum) && !isNaN(bNum)) {
                return isAscending ? aNum - bNum : bNum - aNum;
            }
            
            // 字符串比较
            if (aText < bText) return isAscending ? -1 : 1;
            if (aText > bText) return isAscending ? 1 : -1;
            return 0;
        });
        
        // 重新排列行
        rows.forEach(row => tbody.appendChild(row));
        
        // 更新排序方向
        table.setAttribute('data-sort-dir', isAscending ? 'asc' : 'desc');
        
        // 更新表头样式
        headers.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
        headers[columnIndex].classList.add(isAscending ? 'sort-asc' : 'sort-desc');
        
        // 添加排序样式
        const style = document.createElement('style');
        style.textContent = `
            .sort-asc::after {
                content: ' ↑';
                color: #ffd700;
            }
            
            .sort-desc::after {
                content: ' ↓';
                color: #ffd700;
            }
        `;
        document.head.appendChild(style);
    };
    
    // 使表格可排序
    makeTableSortable();
    
    // 添加返回顶部按钮
    const addBackToTopButton = () => {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '↑ 返回顶部';
        backToTop.className = 'back-to-top';
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background-color: #4e73df;
                color: white;
                border: none;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                font-size: 1rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1000;
            }
            
            .back-to-top:hover {
                background-color: #224abe;
                transform: translateY(-5px);
            }
            
            .back-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
            
            @media (max-width: 480px) {
                .back-to-top {
                    width: 50px;
                    height: 50px;
                    font-size: 0.8rem;
                    bottom: 20px;
                    right: 20px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // 添加到页面
        document.body.appendChild(backToTop);
        
        // 滚动时显示/隐藏按钮
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // 点击返回顶部
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    // 添加返回顶部按钮
    addBackToTopButton();
    
    // 为站点添加更多交互效果
    const enhanceStationInteractivity = () => {
        const stations = document.querySelectorAll('.station');
        
        stations.forEach(station => {
            const cards = station.querySelectorAll('.station-card');
            
            // 点击卡片展开/收起
            cards.forEach(card => {
                const cardContent = card.querySelector('.card-list') || card.querySelector('.image-description');
                if (cardContent) {
                    card.addEventListener('click', function() {
                        cardContent.classList.toggle('expanded');
                        
                        // 添加展开样式
                        const style = document.createElement('style');
                        style.textContent = `
                            .expanded {
                                max-height: 1000px;
                                opacity: 1;
                            }
                        `;
                        document.head.appendChild(style);
                    });
                }
            });
        });
    };
    
    // 增强站点交互性
    enhanceStationInteractivity();
    
    // 添加响应式调整
    const handleResponsive = () => {
        const windowWidth = window.innerWidth;
        const navList = document.querySelector('.nav-list');
    
        
        if (windowWidth <= 768) {
            // 在移动设备上调整导航和搜索
            if (navList) {
                navList.style.flexDirection = 'row';
                navList.style.flexWrap = 'wrap';
            }
            

        } else {
            // 在桌面设备上恢复原始样式
            if (navList) {
                navList.style.flexDirection = 'row';
                navList.style.flexWrap = 'wrap';
            }
            

        }
    };
    
    // 初始化响应式调整
    handleResponsive();
    
    // 窗口大小改变时调整
    window.addEventListener('resize', handleResponsive);
});

// 添加导航链接激活状态样式
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        background-color: #4e73df;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(78, 115, 223, 0.4);
    }
`;
document.head.appendChild(style);