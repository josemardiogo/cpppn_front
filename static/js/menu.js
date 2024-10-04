const menuItems = [
    { icon: "bi-house", label: "Início", show: "home", type: "single", addClass: 'active' },
    { icon: "bi-people", label: "Grupos", show: "groups", type: "single" },
    {
        icon: "bi-people",
        label: "Entidades",
        type: "dropdown",
        items: [
            { icon: "bi-card-list", label: "Administradores", show: "admins", addClass: 'users' },
            { icon: "bi-card-list", label: "Membros", show: "members", addClass: 'users' },
            { icon: "bi-card-list", label: "Associandos", show: "associates", addClass: 'users' },
        ]
    },
    {
        icon: "bi-gear",
        label: "Gestão",
        type: "dropdown",
        items: [
            { icon: "bi-file-earmark-bar-graph", label: "Relatórios", show: "reports" },
            { icon: "bi-cash", label: "Investimentos", show: "investments" },
            { icon: "bi-gift", label: "Benefícios", show: "benefits" },
            { icon: "bi-chat-left-dots", label: "Feedback", show: "feedback" },
            { icon: "bi-briefcase", label: "Carreiras", show: "careers" },
            { icon: "bi-file-spreadsheet", label: "Folha de Pagamento", show: "payroll" },
            { icon: "bi-shield", label: "Riscos e Compliance", show: "risks" },
            { icon: "bi-pie-chart", label: "Portfólio de Investimentos", show: "portfolio" },
            { icon: "bi-laptop", label: "Sistemas", show: "systems" },
            { icon: "bi-graph-up-arrow", label: "Metas e KPIs", show: "kpis" },
            { icon: "bi-kanban", label: "Projetos", show: "projects" },
            { icon: "bi-chat", label: "Comunicação Interna e Externa", show: "communication" },
            { icon: "bi-calendar-event", label: "Eventos", show: "events" },
            { icon: "bi-file-earmark-text", label: "Contratos", show: "contracts" },
            { icon: "bi-journal-bookmark", label: "Treinamentos Internos", show: "training" },
            { icon: "bi-award", label: "Certificações", show: "certifications" }
        ]
    },
    { icon: "bi-person-heart", label: "Suporte ao Beneficiário", show: "beneficiary-support", type: "single" },
    {
        icon: "bi-gear-wide-connected",
        label: "Sistema",
        type: "dropdown",
        items: [
            { icon: "bi-clipboard-data", label: "Auditoria", show: "audits" },
            { icon: "bi-bell", label: "Notificações", show: "notifications" },
            { icon: "bi-key", label: "Permissões", show: "permissions" }
        ]
    },
    { icon: "bi-headset", label: "Suporte Técnico", show: "tech-support", type: "single" },
    { icon: "bi-file-earmark-person", label: "Consultoria Jurídica", show: "legal-consulting", type: "single" },
    { icon: "bi-exclamation-triangle", label: "Identificação de Riscos", show: "risk-identification", type: "single" },
    { icon: "bi-bar-chart-line", label: "Monitoramento de Riscos", show: "risk-monitoring", type: "single" },
    { icon: "bi-person-check", label: "Avaliação de Capacitação", show: "capacity-evaluation", type: "single" }
];

$(document).ready(function () {
    // Usando jQuery para selecionar o elemento UL
    const $ulNav = $('#menu-list');

    // Função para criar um item de menu
    function createMenuItem(item) {
        let $li = $('<li></li>').addClass('li-li-nav').attr('show', item.show);
        if (item.addClass) {
            $li.addClass(item.addClass)
        }
        const icon = `<i class="bi ${item.icon} i-menu icone-style"></i>`;
        const span = `<span class="label">${item.label}</span>`;
        $li.html(`${icon} ${span}`);
        return $li;
    }

    // Função para criar um item de menu dropdown
    function createDropdownMenu(item) {
        const $li = $('<li></li>').addClass('li-nav');

        const $headerDiv = $('<div></div>').addClass('li-nav-header')
            .html(`<div><i class="bi ${item.icon} icone-style"></i> ${item.label}</div><i class="bi bi-chevron-left right-icon"></i>`);

        const $ul = $('<ul></ul>').addClass('ul-ul-nav');

        item.items.forEach(subItem => {
            const $subLi = createMenuItem(subItem);
            $ul.append($subLi);
        });

        $li.append($headerDiv).append($ul);
        return $li;
    }

    // Adicionando os itens ao menu
    menuItems.forEach(item => {
        if (item.type === 'single') {
            $ulNav.append(createMenuItem(item));
        } else if (item.type === 'dropdown') {
            $ulNav.append(createDropdownMenu(item));
        }
    });


    $('.li-nav-header').click(function () {
        $(this).toggleClass('active')
        let li_nav = $(this).parent()
        li_nav.toggleClass('show')
        let li_items = li_nav.find('.ul-ul-nav').find('.li-li-nav').length
        if (li_nav.hasClass('show')) {
            li_nav.css({
                height: (li_items + 1) * 45
            })
        } else {
            li_nav.css({
                height: 45
            })
        }
        const chevronIcon = $(this).find('.bi-chevron-left');
        chevronIcon.toggleClass('right-icon left-icon-volatr');
    })


    $('.li-li-nav').click(function () {

        $('.li-li-nav').removeClass('active')
        $(this).addClass('active')

        let show = $(this).attr('show')

        if (show) {
            show_loader()
            load_window(show);
        }
    })

})

function findLabelByShow(menuItems, show) {
    for (const item of menuItems) {
        // Verifica se o item tem a propriedade `show` e corresponde ao valor procurado
        if (item.show === show) {
            if (item.addClass && item.addClass !== 'active') {
                show = item.addClass
                alert(show)
            }
            let res = [show, item.label]
            console.log(res);
            alert(1)
            return res;
        }

        // Verifica se o item tem sub-itens (dropdown) e faz uma busca dentro deles
        if (item.items) {
            const foundInSubMenu = findLabelByShow(item.items, show);
            if (foundInSubMenu) {
                return foundInSubMenu;
            }
        }
    }
    return null; // Retorna null se o `show` não for encontrado
}