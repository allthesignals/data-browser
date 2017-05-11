export default function(){
  this.transition(
    this.fromRoute('categories.sub-categories.datasets.index'),
    this.toRoute('datasets'),
    this.use('toUp'),
    this.reverse('toDown')
  );
};
