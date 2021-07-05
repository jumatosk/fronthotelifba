import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

const formatValue = Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL'
})

export default formatValue;