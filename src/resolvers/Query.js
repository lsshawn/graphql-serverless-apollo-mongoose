function feed(parent, args, context, info) {
  return context.prisma.links()
}

function hello() {
  return "world"
}

module.exports = {
  feed,
  hello
}