import { Option } from "../components/Option"

export const parseOptionsWithPrices = (options?: string[], prices?: string[]) => {
  if (options && prices) {
    const optionsWithPrices: Option[] = []
    for (let i = 0; i < options.length; i++) {
      optionsWithPrices.push({ label: options[i], value: prices[i] } as Option)
    }
    return optionsWithPrices
  }

  return null
}