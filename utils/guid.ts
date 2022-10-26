let seed = 0;
export default function guid (): string {
  return `${new Date()}_${seed++}`
}